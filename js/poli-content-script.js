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
      p.innerHTML = p.innerHTML.split(senators[j]).join("<span class=\"poli-hover\" senator=\"" + senators[j] +"\">" + senators[j] + "</span>");
      chrome.runtime.sendMessage({
        method: 'GET',
        action: 'xhttp',
        url: 'https://politiquette.herokuapp.com/?name=' + urlName
      }, function(responseText) {
        console.log("text: " + responseText);
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
        tooltipHtml += addPoliBar(data, "Employment and Affirmative Action", senator);
        tooltipHtml += addPoliBar(data, "Unemployed and Low-Income", senator);
        tooltipHtml += addPoliBar(data, "Civil Liberties and Civil Rights", senator);
        
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
      
      
      console.log("found senator " + senators[j] + ", sending...");
    }
  }

}

function addPoliBar(data, text, senator) {
  if (data[text]) {
    var percentage;
    if (parseInt(data[text][1]) == 0) {
      percentage = 0;
    } else if (parseInt(data[text][2]) == 0) {
      percentage = 100;
    } else {

      percentage = Math.round(10 * parseInt(data[text][1])/(parseInt(data[text][2]) + parseInt(data[text][1])))/10;
    }

    console.log(senator + " text1: " + data[text][1]);
    console.log(senator + " text2: " + data[text][2]);

    var bar = "<span class=\"poli-percent-bar\" style=\"width: " + data[text][0] + "%;\"></span>";
    var url = "http://politiquette.herokuapp.com/votes?name=" + senator.replace(" ", "%20").replace("\"","") +"&issue=" + text.split(" ").join("%20") +"&vote="
    var voting = "<span class=\"poli-voting\">Approval: " + percentage + "% <span class=\"poli-up\" poli-url=\"" + url + "1\">U</span><span class=\"poli-down\" poli-url=\"" + url + "-1\";>D</span></span> ";
    // var voting = "";
    return "<p class=\"poli-bar\">" + text + " policy alignment: " + data[text][0] + "%" + voting + bar + "</p>";
  }
  return "";
  
}

function poliVote(url) {
  console.log("wow");
  chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: url
  }, function(responseText) {
    return responseText;
  });
}

document.onmousedown = function (e) {
  console.log("aaa");
  if (!e.target.className.split(" ")[0].startsWith("poli-") || e.target.className.split(" ")[0] == "poli-hover") {
    console.log("nice");
    var tooltips = document.getElementsByClassName("poli-tooltip");
    for (i = 0; i < tooltips.length; i++) {
      tooltips[i].classList.remove("poli-tooltip-visible");
    }
  } else if (e.target.className.split(" ")[0] == "poli-up" || e.target.className.split(" ")[0] == "poli-down") {
    poliVote(e.target.getAttribute("poli-url"));
  }
}
