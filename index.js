console.log("testing");

document.addEventListener("DOMContentLoaded", function () {
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
});

//safe mode buutton functionality 
function safeMode () {
  const safeModeSwitch = document.getElementById("switch");
  let safeModeStatus;

  safeModeSwitch.addEventListener("click", function(){
    if (safeModeStatus = false){
      return console.log(safeModeStatus = "/safemode");
    } else {
      return console.log(safeModeStatus = "");
    }
  })
};

safeMode();