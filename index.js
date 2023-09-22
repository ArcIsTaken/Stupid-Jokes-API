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
  function safeMode() {
    const safeModeSwitch = document.getElementById("switch");
  
    if (safeModeSwitch.checked === true) {
      return "";
    } else {
      return "?safe-mode";
    }
  }

  // retrieve a pun button
  (function() {
    const pun = document.getElementById("pun");
    const jokeDisplay = document.getElementById("joke-display p");

    pun.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Pun${safeMode()}`);
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
            return ">" + returnedPun.setup + "<br>" + ">" + returnedPun.delivery + "<br>" + " " + "<br>";
          } else if (returnedPun.type === "single") {
            jokeDisplay.innerHTML = returnedPun.joke + "<br>" + " " + "<br>";
            return returnedPun.joke;
          } else {
            console.log(returnedPun);
            jokeDisplay.innerHTML = "You have encountered and error or unknown joke type, if it's the latter please add joke type or contact ArcWasTaken on GitHub and make him add the joke type." + "<br>" + "More info in log.";
            return "-" + "<br>" + " " + "<br>";
          }
        })
        .catch(error => {
          // Handle errors, such as network issues or invalid JSON
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  })();


  //programming joke button
  (function() {
    const progJoke = document.getElementById("prog");
    const jokeDisplay = document.getElementById("joke-display p");
      progJoke.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Programming${safeMode()}`);
      fetch(`https://v2.jokeapi.dev/joke/Programming${safeMode()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(returnedProgJoke => {
          console.log("Received Programming Joke:", returnedProgJoke);
          //determines what type of joke the returned joke is, in order to display it correclty
          //if the type is not listed then it logs the full joke data so i can add the type and determine the best way to display it
          if (returnedProgJoke.type === "twopart") {
            jokeDisplay.innerHTML = ">" + returnedProgJoke.setup + "<br>" + ">" + returnedProgJoke.delivery;
            return  ">" + returnedProgJoke.setup + "<br>" + ">" + returnedProgJoke.delivery + "<br>" + " " + "<br>";
          } else if (returnedProgJoke.type === "single") {
            jokeDisplay.innerHTML = returnedProgJoke.joke;
            return returnedProgJoke.joke + "<br>" + " " + "<br>";
          } else {
            console.log(returnedProgJoke);
            jokeDisplay.innerHTML = "You have encountered and error or unknown joke type, if it's the latter please add joke type or contact ArcWasTaken on GitHub and make him add the joke type." + "<br>" + "More info in log.";
            return "-" + "<br>" + " " + "<br>";
          }
        })
        .catch(error => {
          // Handle errors, such as network issues or invalid JSON
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  })();


  //Random Joke Button
  (function() {
    const RandomJoke = document.getElementById("rand");
    const jokeDisplay = document.getElementById("joke-display p");
      RandomJoke.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Any${safeMode()}`);
      fetch(`https://v2.jokeapi.dev/joke/Any${safeMode()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(returnedRandomJoke => {
          console.log("Received Random Joke:", returnedRandomJoke);
          //determines what type of joke the returned joke is, in order to display it correclty
          //if the type is not listed then it logs the full joke data so i can add the type and determine the best way to display it
          if (returnedRandomJoke.type === "twopart") {
            jokeDisplay.innerHTML = ">" + returnedRandomJoke.setup + "<br>" + ">" + returnedRandomJoke.delivery;
            return ">" + returnedRandomJoke.setup + "<br>" + ">" + returnedRandomJoke.delivery + "<br>" + " " + "<br>";
          } else if (returnedRandomJoke.type === "single") {
            jokeDisplay.innerHTML = returnedRandomJoke.joke;
            return returnedRandomJoke.joke + "<br>" + " " + "<br>";
          } else {
            console.log(returnedRandomJoke);
            jokeDisplay.innerHTML = "You have encountered and error or unknown joke type, if it's the latter please add joke type or contact ArcWasTaken on GitHub and make him add the joke type." + "<br>" + "More info in log.";
            return "-" + "<br>" + " " + "<br>";
          }
        })
        .catch(error => {
          // Handle errors, such as network issues or invalid JSON
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  })();

  // adding the already seen jokes into the previously viwed array
  const previouslyViewedJokes = [];



  // End of DOMContentLoaded event listener
});