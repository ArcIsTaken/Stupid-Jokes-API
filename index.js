//if this appears in the log then the JS is properlly linked to the HTML
console.log("JS linked");

document.addEventListener("DOMContentLoaded", function () {
  //testing that the DOM has loaded
  console.log("The Dom is Loaded");

  const storedSwitchState = localStorage.getItem("switchState");
  const switchInput = document.getElementById("switch");

  if (storedSwitchState) {
    // Retrieve the stored value and set the checkbox state accordingly
    switchInput.checked = JSON.parse(storedSwitchState);
  }

  // Add an event listener to the checkbox to update the stored value
  switchInput.addEventListener("change", function () {
    localStorage.setItem("switchState", switchInput.checked);
  });

  // safe mode button functionality 
  function safeMode () {
    const safeModeSwitch = document.getElementById("switch");
    let safeModeStatus = false; // Initialize with the default value
    
    safeModeSwitch.addEventListener("click", function() {
      if (safeModeStatus === false) {
        safeModeStatus = "?safe-mode";
      } else {
        safeModeStatus = "";
      }
    });
  }


  // retrieve a pun button
  (function() {
    const pun = document.getElementById("pun");
    const jokeDisplay = document.getElementById("joke-display p");

    pun.addEventListener("click", function() {
      console.log(`https://v2.jokeapi.dev/joke/Pun${safeMode()}`);
      fetch(`https://v2.jokeapi.dev/joke/Pun${safeMode()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(returnedPun => {
          console.log("Received pun:", returnedPun);
          //determines what type of joke the returned joke is, in order to display it correclty
          //if the type is not listed then it logs the full joke data so i can add the type and dertmine the best way to display it
          if (returnedPun.type === "twopart") {
            jokeDisplay.innerHTML = ">" + returnedPun.setup + "<br>" + ">" + returnedPun.delivery;
          } else if (returnedPun.type === "single") {
            jokeDisplay.innerHTML = returnedPun.joke;
          } else {
            console.log(returnedPun);
            jokeDisplay.innerHTML = "please add joke type or contact ArcWasTaken on GitHub and make him add the joke type." + "<br>" + "More info in log.";
          }
        })
        .catch(error => {
          // Handle errors, such as network issues or invalid JSON
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  })();


  //programming joke button

  //Random Joke Button

  // End of DOMContentLoaded event listener
});