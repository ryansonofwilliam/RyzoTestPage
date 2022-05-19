var container = document.getElementById("stop_watch_container");
var current_number = 00;
var interval;
var minutes = 0;
var seconds = 0;
var lap_number = 0;

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

//Create a timer to start counting when start button is pressed, and reacts properly
//to the stop and reset buttons
var start_flag = false;

startbtn.onclick = function () {
  // Activates only if the flag is set to true and the timer is running
  if (start_flag == true) {
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
    // lap_time_list.appendChild(saved_lap);
    stopbtn.onclick = function () {
      clearInterval(interval);
      start_flag = false;
      startbtn.innerText = "Start!";
      return;
    };
  }
  // Activates whenever the timer is stopped
  if (start_flag == false) {
    clearInterval(interval);
    interval = setInterval(adder, 10);
    startbtn.innerText = "Lap!";
    start_flag = true;
  }
};

// Stops the timer
stopbtn.onclick = function () {
  clearInterval(interval);
  //Add lap functionality
  start_flag = false;
  startbtn.innerText = "Start!";
};

// resets the time
resetbtn.onclick = function () {
  clearInterval(interval);
  current_number = 00;
  seconds = 00;
  minutes = 00;
  displayed_number.innerHTML = "Cleared";
  //Add lap functionality
  startbtn.innerText = "Start!";
  start_flag = false;
  //Add lap-time reset.
  lap_time_list.innerHTML = "";
  lap_number = 0;
};

function adder() {
  current_number++;

  if (current_number > 99) {
    current_number = 00;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }

  if (current_number < 9) {
    displaymillis = "0" + current_number;
  } else {
    displaymillis = current_number;
  }
  if (seconds < 9) {
    displayseconds = "0" + seconds;
  } else {
    displayseconds = seconds;
  }
  if (minutes < 9) {
    displayminutes = "0" + minutes;
  } else {
    displayminutes = minutes;
  }

  displayed_number.innerText =
    displayminutes + " " + displayseconds + " " + displaymillis;
}
