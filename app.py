from bs4 import BeautifulSoup
from flask import Flask, request, render_template, Response
import requests,json


def getID(name):
    r  = requests.get("https://votesmart.org/x/search?s="+"%20".join(name.split()))
    if "results" in r.json():
        return [result["candidate_id"] for result in r.json()["results"]][0]
    return False

def printd(d):
    return (json.dumps(d, sort_keys=True, indent=4, separators=(',', ': ')))

def getRatings(name):
    try:

        ID = getID(name)
        print(name,ID)
        url = "https://votesmart.org/candidate/evaluations/"+str(ID)+"/"
        r = requests.get(url)
        txt = r.text.encode("utf-8")
        soup = BeautifulSoup(txt, "lxml")

        issuedivs = soup.findAll("div", {"class":"issues"})
        allratings = dict()
        for div in issuedivs:
            issue = div.h4.text
            rows = div.table.find_all("tr")
            allcols = []
            for row in rows:
                cols = row.find_all('td')
                allcols.append([ele.text.strip() for ele in cols])
            temp = [int(c[2].replace("%","")) for c in allcols if c[2].replace("%","").isdigit()]
            avg = sum(temp)//len(temp)
            allratings[issue]=avg

        title = soup.find(itemprop="jobTitle").get_text().strip()
        allratings[state] = title.split(', ')[0]
        allratings[party] = title.split(', ')[1]

        return allratings
    except:
        return {"not found":"true"}





app = Flask(__name__)


json_data=open("senatorsdata4.json").read()

senatorsdata = json.loads(json_data)


# print(senatorsdata.keys())

@app.route('/', methods = ['GET'])
def change():
    name = request.args.get('name', '')

    if name in senatorsdata:
        temp = {name:senatorsdata[name]}
        return Response(json.dumps(temp), mimetype='application/json')
        # return str(json.dumps(senatorsdata[name]))
    return "not found"

@app.route('/votes', methods = ['GET'])
def votes():
    try:
        senator = str(request.args.get('name'))
        issue = str(request.args.get('issue'))
        vote = str(request.args.get('vote'))

        if senator in senatorsdata:
            if issue in senatorsdata[senator] and issue!="state" and issue!="party" and issue!="civil":
                if vote=="1":
                    senatorsdata[senator][issue][1] =  senatorsdata[senator][issue][1]+1
                    return (senator+issue+"updated to"+str(senatorsdata[senator][issue][1]+1))
                elif vote=="-1":
                    senatorsdata[senator][issue][2] =  senatorsdata[senator][issue][2]-1
                    return (senator+issue+"updated to"+str(senatorsdata[senator][issue][2]-1))
        return "shamikh is handling the buisness side" # error
    except:
        return "shamikh is handling the buisness side" # error

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
