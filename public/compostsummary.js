/*
Edward Brunton
Joyce Wang
CSC 337 001

Gets data from a GET request to display all windrow information on the summary page.
*/
"use strict";
(function () {
  /**
   * Requests all windrow info from the server.
   * Processes and displays on summary page.
   */
  let urlStem = "https://edwardbruntonandjoycewang.herokuapp.com/"

  window.onload = function (){
		let url = urlStem + "?mode=windrow";
		fetch(url)
			.then(checkStatus)
			.then(function(responseText) {
				let data = JSON.parse(responseText);
				let windrow = data.windrows;
				for (let i = 0; i<windrow.length; i++){
          var w = document.createElement("h3");
          w.innerHTML = windrow[i].name;
          var sd = document.createElement("p");
          sd.innerHTML = "Start Date: "+windrow[i].startD;
          var vol = document.createElement("p");
          vol.innerHTML = "Total Volume: "+windrow[i].totalF+" yd3 " + "(" +
          windrow[i].food + " food, "+windrow[i].manure + " manure, " + windrow[i].overs
          + " overs, and " + windrow[i].chipped + " chipped)";
          var care = document.createElement("p");
          var turn, water;
          if (windrow[i].turn == ""){
            turn = 0;
          }
          else {
            turn = windrow[i].turn;
          }
          if (windrow[i].water == ""){
            water = 0;
          }
          else {
            water = windrow[i].water;
          }
          care.innerHTML = "Turned " + turn + " times, watered " +
          water + " times"
          //current windrows
					if (windrow[i].endD == ""){
						document.getElementById("curr1").appendChild(w);
						document.getElementById("curr1").appendChild(sd);
            document.getElementById("curr1").appendChild(vol);
						if (windrow[i].activeD == ""){
							var stage = document.createElement("p");
							stage.innerHTML = "Stage: Pre-Active";
						}
						else {
							var stage = document.createElement("p");
							stage.innerHTML = "Stage: Active since " + windrow[i].activeD;
              stage.style.color ="red";
						}
            document.getElementById("curr1").appendChild(stage);
            document.getElementById("curr1").appendChild(care);

					}
					//completed windrow
					else {
						document.getElementById("curr2").appendChild(w);
						document.getElementById("curr2").appendChild(sd);
            var ed = document.createElement("p");
            ed.innerHTML = "End Date: "+windrow[i].endD;
            document.getElementById("curr2").appendChild(ed);
            document.getElementById("curr2").appendChild(vol);
            document.getElementById("curr2").appendChild(care);
					}
				}
			});
    }
      /**
   *Checks the status of a response and returns the text or the error code
   *Parameters:
      *Response: server response that contains status and text
   */
  function checkStatus(response) {
      const lowEndValid = 200;
      const highEndValid = 300;
      console.log(response.status);
      console.log(response);
      if (response.status >= lowEndValid && response.status < highEndValid) {
          return response.text();
      }
      else {
          console.log("unacceptable return");
          clearError();
          console.log(response);
          console.log("error cleared");
          addError(response.statusText);
          console.log("error added to gui");
      }
  }
})();
