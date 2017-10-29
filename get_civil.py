from bs4 import BeautifulSoup
from flask import Flask, request, render_template
import requests,json

senators = ['Richard Shelby', 'Luther Strange', 'Lisa Murkowski', 'Dan Sullivan', 'John McCain', 'Jeff Flake', 'John Boozman', 'Tom Cotton', 'Dianne Feinstein', 'Kamala Harris', 'Michael Bennet', 'Cory Gardner', 'Richard Blumenthal', 'Chris Murphy', 'Tom Carper', 'Chris Coons', 'Bill Nelson', 'Marco Rubio', 'Johnny Isakson', 'David Perdue', 'Brian Schatz', 'Mazie Hirono', 'Mike Crapo', 'Jim Risch', 'Dick Durbin', 'Tammy Duckworth', 'Joe Donnelly', 'Todd Young', 'Chuck Grassley', 'Joni Ernst', 'Pat Roberts', 'Jerry Moran', 'Mitch McConnell', 'Rand Paul', 'Bill Cassidy', 'John N. Kennedy', 'Susan Collins', 'Angus King', 'Ben Cardin', 'Chris Van Hollen', 'Elizabeth Warren', 'Ed Markey', 'Debbie Stabenow', 'Gary Peters', 'Amy Klobuchar', 'Al Franken', 'Thad Cochran', 'Roger Wicker', 'Claire McCaskill', 'Roy Blunt', 'Jon Tester', 'Steve Daines', 'Deb Fischer', 'Ben Sasse', 'Dean Heller', 'Catherine Cortez Masto', 'Jeanne Shaheen', 'Maggie Hassan', 'Bob Menendez', 'Cory Booker', 'Tom Udall', 'Martin Heinrich', 'Chuck Schumer', 'Kirsten Gillibrand', 'Richard Burr', 'Thom Tillis', 'John Hoeven', 'Heidi Heitkamp', 'Sherrod Brown', 'Rob Portman', 'Jim Inhofe', 'James Lankford', 'Ron Wyden', 'Jeff Merkley', 'Bob Casey Jr.', 'Pat Toomey', 'Jack Reed', 'Sheldon Whitehouse', 'Lindsey Graham', 'Tim Scott', 'John Thune', 'Mike Rounds', 'Lamar Alexander', 'Bob Corker', 'John Cornyn', 'Ted Cruz', 'Orrin Hatch', 'Mike Lee', 'Patrick Leahy', 'Bernie Sanders', 'Mark Warner', 'Tim Kaine', 'Patty Murray', 'Maria Cantwell', 'Joe Manchin', 'Shelley Moore Capito', 'Ron Johnson', 'Tammy Baldwin', 'Mike Enzi', 'John Barrasso']
#senators = ['Richard Shelby', 'Luther Strange']

def get_civil(name):
	#civil_rights_views = {senator: [] for senator in senators}
	#for senator in senators:
	sen = name.split(' ')
	url = 'http://www.ontheissues.org/Senate/' + sen[0] + '_' + sen[1] + '.htm'
	r = requests.get(url)
	txt = r.text.encode("utf-8")
	soup = BeautifulSoup(txt, "lxml")
	list = soup.findAll("li")


	aclu = [x.text.strip() for x in list if "ACLU" in x.text.strip()]
	hrc = [x.text.strip() for x in list if "HRC" in x.text.strip()]
	naacp = [x.text.strip() for x in list if "NAACP" in x.text.strip()]
	all = aclu + hrc + naacp
	return all


json_data=open("senatorsdata.json").read()

senatorsdata = json.loads(json_data)

for name in senatorsdata:
	temp = get_civil(name)
	print(temp)
	if temp!=[]:
		senatorsdata[name]["civil"] = temp
def printd(d):
    return(json.dumps(d, sort_keys=True, indent=4, separators=(',', ': ')))

f = open("senatorsdata2.json","w")
f.write(printd(senatorsdata))
f.close()
	# if __name__ == '__main__':
	# 	print (civil_rights_views)
