document.addEventListener("DOMContentLoaded", function () {
  console.log ("DOM is loaded");
  //functions to handle the incoming joke array to display them properly

  function pushJokeText() {
    previouslyViewedJokes.push(jokeText);
    previouslyViewedJokesViewport.innerHTML = previouslyViewedJokes.join("<br>");
  }

  //iterates over the returned jokes and displays them properly. also resets the joke window
  function renderJokes(jokeObject, jokeDisplay) {
    jokeDisplay.innerHTML = "";

    jokeObject.forEach(joke => {
      if (joke.type === "single") {
        jokeDisplay.innerHTML += joke.joke  + "<br>" + " " + "<br>";
        jokeText +=  joke.joke  + "<br>" + " " + "<br>";
        pushJokeText();
      } else if (joke.type === "twopart") {
        jokeDisplay.innerHTML += ">" + joke.setup + "<br>" + ">" + joke.delivery + "<br>" + " " + "<br>";
        jokeText += ">" + joke.setup + "<br>" + ">" + joke.delivery + "<br>" + " " + "<br>";
        pushJokeText();
      } else {
        jokeDisplay.innerHTML += "You have encountered an error or an unknown joke type. Please contact ArcIsTaken on GitHub for assistance.";
        jokeText += "-" + "<br>" + " " + "<br>";
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
  })();

  //programming joke button
  (function() {
    const progJoke = document.getElementById("prog");
    const jokeDisplay = document.getElementById("joke-display_p");

      progJoke.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Programming?amount=5${safeMode()}`);
      fetch(`https://v2.jokeapi.dev/joke/Programming?amount=5${safeMode()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(returnedProgJoke => {
        console.log("Received Programming Jokes:", returnedProgJoke);
        if (Array.isArray(returnedProgJoke.jokes)) {
          let returnedProgJokeArray = returnedProgJoke.jokes;
          console.log("Returned programming joke array: " + returnedProgJokeArray);
          renderJokes(returnedProgJokeArray, jokeDisplay);
        }
      })
      .catch(error => {
        // Handle errors, such as network issues or invalid JSON
        console.error("There was a problem with the fetch operation:", error);
    
        // Render an error message to the user
        jokeDisplay.innerHTML = "There was a problem retrieving jokes. Please try again later.";
      });
    });
  })();


  //Random Joke Button
  (function() {
    const RandomJoke = document.getElementById("rand");
    const jokeDisplay = document.getElementById("joke-display_p");

      RandomJoke.addEventListener("click", function() {
      console.log(`Fetch sent: https://v2.jokeapi.dev/joke/Any?amount=5${safeMode()}`);
      fetch(`https://v2.jokeapi.dev/joke/Any?amount=5${safeMode()}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(returnedRandJoke => {
          console.log("Received Random Jokes:", returnedRandJoke);
          if (Array.isArray(returnedRandJoke.jokes)) {
            let returnedRandJokeArray = returnedRandJoke.jokes;
            console.log("Returned random joke array: " + returnedRandJokeArray);
            renderJokes(returnedRandJokeArray, jokeDisplay);
          }
        })
        .catch(error => {
          // Handle errors, such as network issues or invalid JSON
          console.error("There was a problem with the fetch operation:", error);
          // Render an error message to the user
          jokeDisplay.innerHTML = "There was a problem retrieving jokes. Please try again later.";
        });
      });
  })();

  // End of DOMContentLoaded event listener
});