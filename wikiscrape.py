# from bs4 import BeautifulSoup
import requests,json
#
# url = "https://en.wikipedia.org/wiki/Current_members_of_the_United_States_Senate"
#
# r = requests.get(url)
# # print(r.text.encode("utf-8"))
# soup = BeautifulSoup(r.text, "lxml")
#
# s = soup.findAll("span", {"class":"vcard"})
#
# print([c.text for c in s])

senators = ['Richard Shelby', 'Luther Strange', 'Lisa Murkowski', 'Dan Sullivan', 'John McCain', 'Jeff Flake', 'John Boozman', 'Tom Cotton', 'Dianne Feinstein', 'Kamala Harris', 'Michael Bennet', 'Cory Gardner', 'Richard Blumenthal', 'Chris Murphy', 'Tom Carper', 'Chris Coons', 'Bill Nelson', 'Marco Rubio', 'Johnny Isakson', 'David Perdue', 'Brian Schatz', 'Mazie Hirono', 'Mike Crapo', 'Jim Risch', 'Dick Durbin', 'Tammy Duckworth', 'Joe Donnelly', 'Todd Young', 'Chuck Grassley', 'Joni Ernst', 'Pat Roberts', 'Jerry Moran', 'Mitch McConnell', 'Rand Paul', 'Bill Cassidy', 'John N. Kennedy', 'Susan Collins', 'Angus King', 'Ben Cardin', 'Chris Van Hollen', 'Elizabeth Warren', 'Ed Markey', 'Debbie Stabenow', 'Gary Peters', 'Amy Klobuchar', 'Al Franken', 'Thad Cochran', 'Roger Wicker', 'Claire McCaskill', 'Roy Blunt', 'Jon Tester', 'Steve Daines', 'Deb Fischer', 'Ben Sasse', 'Dean Heller', 'Catherine Cortez Masto', 'Jeanne Shaheen', 'Maggie Hassan', 'Bob Menendez', 'Cory Booker', 'Tom Udall', 'Martin Heinrich', 'Chuck Schumer', 'Kirsten Gillibrand', 'Richard Burr', 'Thom Tillis', 'John Hoeven', 'Heidi Heitkamp', 'Sherrod Brown', 'Rob Portman', 'Jim Inhofe', 'James Lankford', 'Ron Wyden', 'Jeff Merkley', 'Bob Casey Jr.', 'Pat Toomey', 'Jack Reed', 'Sheldon Whitehouse', 'Lindsey Graham', 'Tim Scott', 'John Thune', 'Mike Rounds', 'Lamar Alexander', 'Bob Corker', 'John Cornyn', 'Ted Cruz', 'Orrin Hatch', 'Mike Lee', 'Patrick Leahy', 'Bernie Sanders', 'Mark Warner', 'Tim Kaine', 'Patty Murray', 'Maria Cantwell', 'Joe Manchin', 'Shelley Moore Capito', 'Ron Johnson', 'Tammy Baldwin', 'Mike Enzi', 'John Barrasso']
print (len(senators))
#
# def printd(d):
#     return(json.dumps(d, sort_keys=True, indent=4, separators=(',', ': ')))
#
# json_data=open("senatorsdata.json").read()
#
# data = json.loads(json_data)
# printd(data)
#
#
# f = open("senatorsdata.json","w")
# f.write(printd(data))
# f.close()
