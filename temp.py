import json

json_data=open("senatorsdata.json").read()

senatorsdata = json.loads(json_data)
# print(senatorsdata.keys())
print(senatorsdata["Al Franken"])
