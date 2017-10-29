var paragraphs = document.getElementsByTagName("p");

var senators = [
  "Richard Shelby",
  "Luther Strange",
  "Lisa Murkowski",
  "Dan Sullivan",
  "John McCain",
  "Jeff Flake",
  "John Boozman",
  "Tom Cotton",
  "Dianne Feinstein",
  "Kamala Harris",
  "Michael Bennet",
  "Cory Gardner",
  "Richard Blumenthal",
  "Chris Murphy",
  "Tom Carper",
  "Chris Coons",
  "Bill Nelson",
  "Marco Rubio",
  "Johnny Isakson",
  "David Perdue",
  "Brian Schatz",
  "Mazie Hirono",
  "Mike Crapo",
  "Jim Risch",
  "Dick Durbin",
  "Tammy Duckworth",
  "Joe Donnelly",
  "Todd Young",
  "Chuck Grassley",
  "Joni Ernst",
  "Pat Roberts",
  "Jerry Moran",
  "Mitch McConnell",
  "Rand Paul",
  "Bill Cassidy",
  "John N. Kennedy",
  "Susan Collins",
  "Angus King",
  "Ben Cardin",
  "Chris Van Hollen",
  "Elizabeth Warren",
  "Ed Markey",
  "Debbie Stabenow",
  "Gary Peters",
  "Amy Klobuchar",
  "Al Franken",
  "Thad Cochran",
  "Roger Wicker",
  "Claire McCaskill",
  "Roy Blunt",
  "Jon Tester",
  "Steve Daines",
  "Deb Fischer",
  "Ben Sasse",
  "Dean Heller",
  "Catherine Cortez Masto",
  "Jeanne Shaheen",
  "Maggie Hassan",
  "Bob Menendez",
  "Cory Booker",
  "Tom Udall",
  "Martin Heinrich",
  "Chuck Schumer",
  "Kirsten Gillibrand",
  "Richard Burr",
  "Thom Tillis",
  "John Hoeven",
  "Heidi Heitkamp",
  "Sherrod Brown",
  "Rob Portman",
  "Jim Inhofe",
  "James Lankford",
  "Ron Wyden",
  "Jeff Merkley",
  "Bob Casey Jr.",
  "Pat Toomey",
  "Jack Reed",
  "Sheldon Whitehouse",
  "Lindsey Graham",
  "Tim Scott",
  "John Thune",
  "Mike Rounds",
  "Lamar Alexander",
  "Bob Corker",
  "John Cornyn",
  "Ted Cruz",
  "Orrin Hatch",
  "Mike Lee",
  "Patrick Leahy",
  "Bernie Sanders",
  "Mark Warner",
  "Tim Kaine",
  "Patty Murray",
  "Maria Cantwell",
  "Joe Manchin",
  "Shelley Moore Capito",
  "Ron Johnson",
  "Tammy Baldwin",
  "Mike Enzi",
  "John Barrasso",
]
for (i = 0; i < paragraphs.length; i++) {
  var p = paragraphs[i];

  for (j = 0; j < senators.length; j++) {
    if (p.innerHTML.includes(senators[j])) {
      var urlName = senators[j].split(" ").join("%20");
      chrome.runtime.sendMessage({
        method: 'GET',
        action: 'xhttp',
        url: 'https://politiquette.herokuapp.com/?name=' + urlName,
        senator: senators[j]
      }, function(responseText) {
        var response = JSON.parse(responseText);
        var senator = Object.keys(response)[0];
        var data = response[senator];
        console.log(senator + " data: " + data);
      
        var party = data.party.charAt(0);
        var partyColor;
        if (party == "D") {
          partyColor = "poli-blue";
        } else {
          partyColor = "poli-red";
        }
        var tooltipHtml = "<h2>" + senator + "<span class=\"poli-party-state " + partyColor + "\">" + party +" | " + data.state.slice(13, 15) +"</span></h2>";
        tooltipHtml += addPoliBar(data, "Employment and Affirmative Action");
        tooltipHtml += addPoliBar(data, "Unemployed and Low-Income");
        tooltipHtml += addPoliBar(data, "Civil Liberties and Civil Rights");
        
        if (data.civil) {
          for (k = 0; k < data.civil.length; k++) {
            tooltipHtml += "<p class=\"poli-info\">" + data.civil[k] + "</p>";
          }
        }
        
        // "Fiscally Conservative", "Socially Conservative", "Socially Liberal", "Fiscally Liberal"
        
        var div = document.createElement("div");
        div.setAttribute("class","poli-tooltip");
        div.innerHTML = tooltipHtml;
        var senatorHtml = document.querySelectorAll("[senator=\"" + senator + "\"]")[0];
        senatorHtml.appendChild(div);
        senatorHtml.removeAttribute("senator");
        senatorHtml.addEventListener("click", function() {
          this.children[0].classList.add('poli-tooltip-visible');
        });
        
        console.log(data);
      });
      p.innerHTML = p.innerHTML.split(senators[j]).join("<span class=\"poli-hover\" senator=\"" + senators[j] +"\">" + senators[j] + "</span>");
      
      console.log("found senator " + senators[j] + ", sending...");
    }
  }

}

function addPoliBar(data, text) {
  if (data[text]) {
    var percentage = Math.round(10 * parseInt(data[text][1])/parseInt(data[text][2]))/10;
    if (isNaN(percentage)) {
      percentage = 0;
    }

    console.log("text1: " + data[text][1]);
    console.log("text2: " + data[text][2]);

    var bar = "<span class=\"poli-percent-bar\" style=\"width: " + data[text][0] + "%;\"></span>";
    var voting = "<span class=\"poli-voting\">Approval: " + percentage + "% <span class=\"poli-up\">U</span><span class=\"poli-down\">D</span></span> ";
    return "<p class=\"poli-bar\">" + text + " policy alignment: " + data[text][0] + "%" + voting + bar + "</p>";
  }
  return "";
  
}