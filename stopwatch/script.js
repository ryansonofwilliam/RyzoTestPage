// Declare some variables
var container = document.getElementById("stop_watch_container");
var current_number = 00;
var stored_number = 00;
var interval;
var minutes = 0;
var seconds = 0;
var lap_number = 0;
var exit_time;
var save_flag;
var loaded_timer;
var displayminutes;
var displayseconds;
var displaymillis;
var start_flag = false;
var first_run = true;

//Set the Title
var title = document.createElement("p");
title.setAttribute("class", "title");
title.innerText = "Stopwatch";
container.appendChild(title);

//Set the description
var description = document.createElement("p");
description.setAttribute("class", "description");
description.innerText = "Vanilla JS Stopwatch";
container.appendChild(description);

//Create text box for lap times
var lap_time_container = document.createElement("div");
var lap_time_list = document.createElement("ul");
lap_time_container.setAttribute("class", "lap_time_container");
lap_time_list.setAttribute("class", "lap_time_list");
lap_time_container.appendChild(lap_time_list);
container.appendChild(lap_time_container);

//Create a counter container and contents
var counter_container = document.createElement("div");
counter_container.setAttribute("class", "counter_container");
container.appendChild(counter_container);

var displayed_number = document.createElement("p");
displayed_number.setAttribute("class", "current_number");
counter_container.appendChild(displayed_number);
displayed_number.innerHTML = "00 00 00";

//Create a button container and add buttons
var buttons = document.createElement("div");
buttons.setAttribute("class", "button_container");
container.appendChild(buttons);

var startbtn = document.createElement("button");
var stopbtn = document.createElement("button");
var resetbtn = document.createElement("button");

startbtn.innerText = "Start!";
stopbtn.innerText = "Stop!";
resetbtn.innerText = "Reset.";
buttons.appendChild(startbtn);
buttons.appendChild(stopbtn);
buttons.appendChild(resetbtn);

//Set the buttons to functions
startbtn.onclick = startTimer;
stopbtn.onclick = stopTimer;
resetbtn.onclick = resetTimer;

//Set the class of buttons to hide when inactive using CSS --  NEED TO ADD INACTIVE
function setStatus(status) {
  if (status == "stopped") {
    localStorage.setItem("number_on_stop", number_on_stop);

    stopbtn.setAttribute("class", "inactive");
    stopbtn.disabled = true;
    save_flag = "stopped";
    console.log("status = stopped");
  }
  if (status == "reset") {
    stopbtn.setAttribute("class", "inactive");
    resetbtn.setAttribute("class", "inactive");
    stopbtn.disabled = true;
    resetbtn.disabled = true;
    save_flag = "reset";
    console.log("status = reset");
  }
  if (status == "running") {
    stopbtn.setAttribute("class", "active");
    resetbtn.setAttribute("class", "active");
    stopbtn.disabled = false;
    resetbtn.disabled = false;
    save_flag = "running";
    console.log("status = running");
  }
  localStorage.setItem("flag", save_flag);
}

//Save details to local storage so counter continues when window closed
addEventListener("unload", saveState);
addEventListener("load", loadState);

//Save the state on exit
function saveState() {
  exit_time = new Date().getTime();
  localStorage.setItem("exit_time", exit_time);
  localStorage.setItem("timer", current_number);
  localStorage.setItem("number_on_stop", number_on_stop);
  localStorage.setItem("flag", save_flag);
}

//load the details on window open and resume
function loadState() {
  console.log("loadState running");
  flag = localStorage.getItem("flag");
  saved_time = localStorage.getItem("timer");
  time_then = parseInt(localStorage.getItem("exit_time"));
  number_on_stop = localStorage.getItem("number_on_stop");
  time_now = new Date().getTime();
  loaded_timer = Math.floor((time_now - time_then + saved_time * 10) / 10);
  console.log(loaded_timer);

  if (flag == "stopped") {
    current_number = loaded_timer;
    dateBasedTimer();
    counter_container.appendChild(displayed_number);
    console.log("current_number " + current_number);
    console.log("displayed_number " + displayed_number.innerText);
    setStatus("stopped");
  } else if (flag == "running") {
    setStatus("running");
    clearInterval(interval);
    startbtn.innerText = "Lap!";
    start_time = new Date().getTime() - loaded_timer - (time_now - time_then);
    console.log(start_time);
    console.log("running save");
    interval = setInterval(dateBasedTimer, 10);
    first_run = false;
  } else {
    setStatus("reset");
    console.log("no save");
  }
}

//Create a timer to start counting when start button is pressed, then change to lap.

function startTimer() {
  // Starts the timer - activates only whenever the timer is stopped
  if (save_flag == "reset") {
    start_time = new Date().getTime();
    console.log("startTimer");
    setStatus("running");
    clearInterval(interval);
    interval = setInterval(dateBasedTimer, 10);
    startbtn.innerText = "Lap!";
  }
  if (save_flag == "stopped") {
    start_time = new Date().getTime() - number_on_stop;
    console.log("startTimer");
    setStatus("running");
    clearInterval(interval);
    interval = setInterval(dateBasedTimer, 10);
    startbtn.innerText = "Lap!";
  }
  // Activates only if the flag is set to true and the timer is running
  if (save_flag == "running") {
    if (startbtn.innerText == "Lap!" && first_run == false) {
      lap_number++;
      var saved_lap = document.createElement("li");
      saved_lap.innerText =
        lap_number +
        ". " +
        displayminutes +
        ":" +
        displayseconds +
        ":" +
        displaymillis;
      lap_time_list.insertBefore(saved_lap, lap_time_list.firstChild);
    }
    first_run = false;
    return;
  }
}

//Stops the timer
function stopTimer() {
  number_on_stop = current_number;
  clearInterval(interval);
  setStatus("stopped");
  //Add lap functionality
  startbtn.innerText = "Start!";
  first_run = true;
  return;
}

//Resets the time
function resetTimer() {
  setStatus("reset");
  clearInterval(interval);
  stored_number = 00;
  localStorage.setItem("timer", 00);
  current_number = 00;
  seconds = 00;
  minutes = 00;
  displayed_number.innerHTML = "Cleared";
  //Add lap functionality
  startbtn.innerText = "Start!";
  //Add lap-time reset.
  lap_time_list.innerHTML = "";
  lap_number = 0;
  first_run = true;
  start_time = 0;
}
/* Construct a new timimg method using pure Date() for extra accuracy
 when start is pressed, the time is logged ("start_time") and the "current_time" is continuously logged.
 the difference between the two is the "current_number".
 when stop is pressed. the "current_number" is saved as "number_on_stop" so that when start is pressed again this number 
 can be added to the new "current_number". 
*/
var start_time;
var current_time;
var number_on_stop;

function dateBasedTimer() {
  current_time = new Date().getTime();
  if (save_flag == "running") {
    current_number = current_time - start_time;
    console.log("in the dBT");
  }

  var tenths = current_number.toString().slice(-3, -1);
  seconds = Math.floor(current_number / 1000);
  minutes = Math.floor(current_number / 60000);

  while (seconds >= 60) {
    seconds -= 60;
  }
  if (current_number <= 9) {
    displaymillis = "0" + tenths;
  } else {
    displaymillis = tenths;
  }
  if (seconds <= 9) {
    displayseconds = "0" + seconds;
  } else {
    displayseconds = seconds;
  }
  if (minutes <= 9) {
    displayminutes = "0" + minutes;
  } else {
    displayminutes = minutes;
  }

  displayed_number.innerText =
    displayminutes + " " + displayseconds + " " + displaymillis;
}

// //Generate and formats the timer !!!DEFUNCT!!!
// function adder() {
//   current_number++;
//   var tenths = current_number.toString().slice(-2);
//   seconds = Math.floor(current_number / 100);
//   minutes = Math.floor(current_number / 6000);

//   while (seconds >= 60) {
//     seconds -= 60;
//   }
//   if (current_number <= 9) {
//     displaymillis = "0" + tenths;
//   } else {
//     displaymillis = tenths;
//   }
//   if (seconds <= 9) {
//     displayseconds = "0" + seconds;
//   } else {
//     displayseconds = seconds;
//   }
//   if (minutes <= 9) {
//     displayminutes = "0" + minutes;
//   } else {
//     displayminutes = minutes;
//   }

//   displayed_number.innerText =
//     displayminutes + " " + displayseconds + " " + displaymillis;
// }
