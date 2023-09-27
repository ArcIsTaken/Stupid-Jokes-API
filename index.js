document.addEventListener("DOMContentLoaded", function () {
  console.log ("DOM is loaded");
  //functions to handle the incoming joke array to display them properly

  function pushJokeText() {
    previouslyViewedJokes.push(jokeText);
    previouslyViewedJokesViewport.innerHTML = previouslyViewedJokes.join("<br>");
  }

  //what do?
  function renderJokes(jokeObject, jokeDisplay) {
    jokeObject.forEach(joke => {
      if (joke.type === "single") {
        jokeDisplay.innerHTML += ">" + joke.setup + "<br>" + ">" + joke.delivery + "<br>" + " " + "<br>";
        jokeText += ">" + joke.setup + "<br>" + ">" + joke.delivery + "<br>" + " " + "<br>";
        pushJokeText();
      } else if (joke.type === "twopart") {
        jokeDisplay.innerHTML += ">" + joke.setup + "<br>" + ">" + joke.delivery + "<br>" + " " + "<br>";
        jokeText += ">" + joke.setup + "<br>" + ">" + joke.delivery + "<br>" + " " + "<br>";
        pushJokeText();
      } else {
        jokeDisplay.innerHTML = "You have encountered an error or an unknown joke type. Please contact ArcIsTaken on GitHub for assistance.";
        jokeText = "-" + "<br>" + " " + "<br>";
        pushJokeText();
      }
    });
  }
  
  //setting up previously viewed array
  let jokeText;
  const previouslyViewedJokes = [];
  let previouslyViewedJokesViewport = document.getElementById("previousBox_p");

  //variables for saving safe mode switch state
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
      return "&safe-mode";
    }
  }

  // retrieve a pun button
  (function() {
    const pun = document.getElementById("pun");
    const jokeDisplay = document.getElementById("joke-display_p");
  
    pun.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Pun?amount=5${safeMode()}`);
      fetch(`https://v2.jokeapi.dev/joke/Pun?amount=5${safeMode()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(returnedPuns => {
        console.log("Received Puns:", returnedPuns);
        if (Array.isArray(returnedPuns.jokes)) {
          let returnedPunsArray = returnedPuns.jokes;
          console.log("Returned joke array: " + returnedPunsArray);
          renderJokes(returnedPunsArray, jokeDisplay);
        }
      })
      .catch(error => {
        // Handle errors, such as network issues or invalid JSON
        console.error("There was a problem with the fetch operation:", error);
    
        // Render an error message to the user
        jokeDisplay.innerHTML = "There was a problem retrieving jokes. Please try again later.";
      });
    });
  });
/*
  //programming joke button
  (function() {
    const progJoke = document.getElementById("prog");
    const jokeDisplay = document.getElementById("joke-display p");

      progJoke.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Programming${safeMode()}?amount=5`);
      fetch(`https://v2.jokeapi.dev/joke/Programming${safeMode()}?amount=5`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(returnedProgJoke => {
          console.log("Received Programming Joke:", returnedProgJoke);
          if (returnedProgJoke.type === "twopart") {
            jokeDisplay.innerHTML = ">" + returnedProgJoke.setup + "<br>" + ">" + returnedProgJoke.delivery;
            jokeText =  ">" + returnedProgJoke.setup + "<br>" + ">" + returnedProgJoke.delivery + "<br>" + " " + "<br>";
            pushJokeText();
          } else if (returnedProgJoke.type === "single") {
            jokeDisplay.innerHTML = returnedProgJoke.joke;
            jokeText = jokeText = returnedProgJoke.joke + "<br>" + " " + "<br>";
            pushJokeText();
          } else {
            console.log(returnedProgJoke);
            jokeDisplay.innerHTML = "You have encountered and error or unknown joke type, if it's the latter please add joke type or contact ArcIsTaken on GitHub and make him add the joke type." + "<br>" + "More info in log.";
            jokeText = "-" + "<br>" + " " + "<br>";
            pushJokeText();
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
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Any${safeMode()}?amount=5`);
      fetch(`https://v2.jokeapi.dev/joke/Any${safeMode()}?amount=5`)
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
            jokeText = ">" + returnedRandomJoke.setup + "<br>" + ">" + returnedRandomJoke.delivery + "<br>" + " " + "<br>";
            pushJokeText();
          } else if (returnedRandomJoke.type === "single") {
            jokeDisplay.innerHTML = returnedRandomJoke.joke;
            jokeText = returnedRandomJoke.joke + "<br>" + " " + "<br>";
            pushJokeText();
          } else {
            console.log(returnedRandomJoke);
            jokeDisplay.innerHTML = "You have encountered and error or unknown joke type, if it's the latter please add joke type or contact ArcIsTaken on GitHub and make him add the joke type." + "<br>" + "More info in log.";
            //placing the response into the previously viewed array and adding it to the view box
            jokeText = "-" + "<br>" + " " + "<br>";
            pushJokeText();
          }
        })
        .catch(error => {
          // Handle errors, such as network issues or invalid JSON
          console.error("There was a problem with the fetch operation:", error);
        });
    });
  })();

  // End of DOMContentLoaded event listener
  */
});