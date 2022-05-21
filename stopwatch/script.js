// Declare some variables
var container = document.getElementById("stop_watch_container");
var current_number = 00;
var stored_number = 00;
var interval;
var minutes = 0;
var seconds = 0;
var lap_number = -1;
var exit_time;
var save_flag = "reset";
var loaded_timer;
var displayminutes;
var displayseconds;
var displaymillis;
var start_flag = false;
var first_run = true;
var get_start_date;
var get_current_date;
var time_started;

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

//Set the class of buttons to hide when inactive using CSS
function setStatus(status) {
  if (status == "stopped") {
    stopbtn.setAttribute("class", "inactive");
    stopbtn.disabled = true;
    save_flag = "stopped";
    console.log("status = stopped");
    stopped_time = current_number;
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
  localStorage.setItem("flag", save_flag);
  // localStorage.setItem("laps", document.querySelector("lap_time_list"));
}

//load the details on window open and resume
function loadState() {
  console.log("loadState running");
  flag = localStorage.getItem("flag");
  saved_time = localStorage.getItem("timer");
  time_then = localStorage.getItem("exit_time");
  lap_time_save = localStorage.getItem("laps");
  // lap_time_container.innerHTML = lap_time_save;
  time_now = new Date().getTime();
  loaded_timer = Math.floor((time_now - time_then + saved_time * 10) / 10);
  console.log(loaded_timer);

  if (flag == "stopped") {
    current_number += loaded_timer;
    newTimer();
    counter_container.appendChild(displayed_number);
    console.log("current_number" + current_number);
    console.log("displayed_number" + displayed_number.innerText);
    setStatus("stopped");
  } else if (flag == "running") {
    current_number = loaded_timer;
    console.log("running save");
    startTimer();
  } else {
    setStatus("reset");
    console.log("no save");
  }
}

//Create a timer to start counting when start button is pressed, then change to lap.

function startTimer() {
  // Starts the timer - activates only whenever the timer is stopped

  if (save_flag == "running") {
    setInterval(newTimer(), 10);
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
    if (startbtn.innerText == "Lap!" && first_run == false) {
      lap_time_list.insertBefore(saved_lap, lap_time_list.firstChild);
    }
    first_run = false;
    return;
  }
  if (save_flag == "stopped" || "reset") {
    console.log("startTimer");
    time_started = new Date().getTime();
    setStatus("running");
    newTimer();
    startbtn.innerText = "Lap!";
  }
  // Activates only if the flag is set to true and the timer is running
}

//Stops the timer
function stopTimer() {
  // clearInterval(interval);
  time_stopped = get_current_date;
  setStatus("stopped");
  //Add lap functionality
  startbtn.innerText = "Start!";
  first_run = true;
  return;
}

//Resets the time
function resetTimer() {
  setStatus("reset");
  // clearInterval(interval);
  stored_number = 00;
  localStorage.setItem("timer", current_number);
  //Format stuff
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
}

//Generate and formats the timer THIS NEEDS TO CHANGE TO A DATE BASED THING.
function newTimer() {
  if (save_flag == "running") {
    console.log('newTimer "running"');
    get_current_date = new Date().getTime();
    current_number = get_current_date - time_started;
    outputFormatter();
  }

  // if the timer is stopped
  if (save_flag == "stopped") {
    current_number = get_current_date + stopped_time - get_start_date;
    outputFormatter();
  }
}

function outputFormatter() {
  tenths = current_number.toString().slice(-3, -1);
  seconds = Math.floor(current_number / 1000);
  minutes = Math.floor(current_number / 60000);

  while (seconds >= 60) {
    seconds -= 60;
  }
  if (tenths <= 9) {
    displaymillis = "0" + tenths;
    if (tenths == "") {
      displaymillis = "00";
    }
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

/// NOW DEFUNCT Using Date() is more accurate
// function adder() {
//   var tenths = current_number.toString().slice(-2);
//   seconds = Math.floor(current_number / 10000);
//   minutes = Math.floor(current_number / 600000);

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
