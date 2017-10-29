from bs4 import BeautifulSoup
from flask import Flask, request, render_template
import requests,json
from wikiscrape import senators


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
        if not ID:
            return {"not found":"true"}
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
        return "Null"

all = {}
i=0
for senator in senators:

    i+=1
    print(i)
    temp = getRatings(senator)
    if temp!="Null":
         all[senator] = temp
         print(senator,temp)
    else:
        print("\n\n\n\nrip\n\n\n\n")

f = open("senatorsdata.json","w")
f.write(printd(all))
f.close()
