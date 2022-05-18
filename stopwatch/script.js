var container = document.getElementById("stop_watch_container")

//Set the Title
var title = document.createElement('p')
title.setAttribute('class', 'title')
title.innerText = "Stopwatch"
container.appendChild(title)

//Set the description
var description = document.createElement('p')
description.setAttribute('class', 'title')
description.innerText = "Vanilla JS Stopwatch"
container.appendChild(description)

//Create a counter container and contents
var counter_container = document.createElement('div');
counter_container.setAttribute('class', 'counter_container')
container.appendChild(counter_container)

var displayed_number = document.createElement('p')
displayed_number.setAttribute('class', 'current_number')
counter_container.appendChild(displayed_number)


//Create a button container and add buttons
var buttons = document.createElement('div')
buttons.setAttribute('class', 'button_container')
container.appendChild(buttons)

var startbtn = document.createElement('button')
var stopbtn = document.createElement('button')
var resetbtn = document.createElement('button')

startbtn.innerText = "Start!"
stopbtn.innerText = "Stop!"
resetbtn.innerText = "Reset."
buttons.appendChild(startbtn)
buttons.appendChild(stopbtn)
buttons.appendChild(resetbtn)

var interval



// const minute = 1000 * 60;
// const hour = minute * 60;
// const day = hour * 24;
// const year = day * 365;

//Create a timer to start counting when start button is pressed

current_number = 00

startbtn.onclick =function() {
    clearInterval(interval)
    interval = setInterval(adder, 10)
}

stopbtn.onclick = function(){
    clearInterval(interval)
}

function adder() { 
    current_number ++
    displayed_number.innerHTML = current_number
}



