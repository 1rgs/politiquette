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
        return allratings
    except:
        return {"not found":"true"}

app = Flask(__name__)


json_data=open("senatorsdata.json").read()

senatorsdata = json.loads(json_data)


# print(senatorsdata.keys())

@app.route('/', methods = ['GET'])
def change():
    name = request.args.get('name', '')
    if name in senatorsdata:
        return Response(json.dumps(senatorsdata[name]), mimetype='application/json')
        # return str(json.dumps(senatorsdata[name]))
    return "not found"

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
