var container = document.getElementById("stop_watch_container");
current_number = 00;
//Set the Title
var title = document.createElement("p");
title.setAttribute("class", "title");
title.innerText = "Stopwatch";
container.appendChild(title);

//Set the description
var description = document.createElement("p");
description.setAttribute("class", "title");
description.innerText = "Vanilla JS Stopwatch";
container.appendChild(description);

//Create a counter container and contents
var counter_container = document.createElement("div");
counter_container.setAttribute("class", "counter_container");
container.appendChild(counter_container);

var displayed_number = document.createElement("p");
displayed_number.setAttribute("class", "current_number");
counter_container.appendChild(displayed_number);
displayed_number.innerHTML = /*"Press Start"*/ current_number;

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

var interval;
var minutes = 0;
var seconds = 0;

// const minute = 1000 * 60;
// const hour = minute * 60;
// const day = hour * 24;
// const year = day * 365;

//Create a timer to start counting when start button is pressed

startbtn.onclick = function () {
  clearInterval(interval);
  interval = setInterval(adder, 10);
};

stopbtn.onclick = function () {
  clearInterval(interval);
};
resetbtn.onclick = function () {
  clearInterval(interval);
  current_number = 00;
  seconds = 00;
  minutes = 00;
  displayed_number.innerHTML = "Cleared";
};

function adder() {
  current_number++;

  if (current_number > 99) {
    current_number = 00;
    seconds++;
  }
  if (seconds > 60) {
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

  displayed_number.innerHTML =
    displayminutes + " " + displayseconds + " " + displaymillis;
}
