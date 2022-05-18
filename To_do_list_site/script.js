// set the variables using QuerySelector/all and getElementByID to find them from the HTML and the CSS*/
var root = document.querySelector(":root"); //these two are from the stylesheet
var container = document.querySelector(".container");
var newTaskInput = document.getElementById("new_task_input"); // thses are from the HTML
var taskform = document.getElementById("new_task_form");
var tasksList = document.getElementById("tasksList");
var taskBtns = document.querySelectorAll(".task_check_btn");
var themeBtn = document.querySelector(".theme_toogle_btn");
// Now add functionality for when the form is submitted.
taskform.addEventListener("submit", function (e) {
  /* .preventDefault stops the form from submitting like it normally 
  would the second bit looks at the input value and assigns it to a 
  variable */
  e.preventDefault();
  var newtaskInputValue = taskform.elements.new_task_input;

  /*the .value bit adds it as a value, 
  'addTask'. function is defined later.*/
  addTask(newtaskInputValue.value);

  /*Removes the class 'task_list_empty' and resets the input value*/
  newtaskInputValue.value = "";
  container.classList.remove("task_list_empty");
});

// Build function to add task to list
function addTask(newTask) {
  // Create a li element and set it's class
  const newTaskItem = document.createElement("li");
  newTaskItem.setAttribute("class", "task_item");

  // create a checkbox element and set it's class/type
  const newCheckBtn = document.createElement("div");
  newCheckBtn.setAttribute("class", "task_check_btn");

  // Create a new span element, set it's class and add new task input
  const newTaskBio = document.createElement("span");
  newTaskBio.setAttribute("class", "task_bio");
  newTaskBio.innerText = newTask; // puts value of input into the li

  //append li tag into ul
  tasksList.appendChild(newTaskItem);
  // append checkbox in li
  newTaskItem.appendChild(newCheckBtn);
  //append newtask in li
  newTaskItem.appendChild(newTaskBio);

  // run this function once task is complete or checkbox is checked.
  // it's defined below
  onTaskComplete(newCheckBtn);
}

// to remove completed task.
function onTaskComplete(btns) {
  btns.addEventListener("click", function (e) {
    var parents = e.target.parentElement;
    parents.classList.add("task-completed"); // to slide the task out to the right
    //now delete that task which we have slid out
    setTimeout(() => {
      // Remove the Parent Element of checkbox which is li, in 0.5s
      parents.remove();
    }, 400);

    if (tasksList.childNodes.length == 1) {
      setTimeout(() => {
        container.classList.add("task_list_empty");
      }, 200);
    }
  });
}

//DArk mode
// Dark mode

themeBtn.addEventListener("click", function () {
  var darkTheme = themeBtn.classList.toggle("dark");

  if (darkTheme) {
    root.style.setProperty("--theme-transition", "1s");
    root.style.setProperty("--primary-color", "#1E1E1E");
    root.style.setProperty("--secondary-color", "#3B3B3B");
    root.style.setProperty("--text-color", "#EAEAEA");
    root.style.setProperty("--task-color", "#3B3B3B");
    root.style.setProperty("--footer-color", "#1E1E1E");
    root.style.setProperty("--theme-btn", `url('assets/Light-theme-btn.svg')`);
    root.style.setProperty("--container-bg", `url('./assets/Dark-empty.svg')`);
    root.style.setProperty("--filter", "invert()");
  } else {
    root.style.setProperty("transition", "1s");
    root.style.setProperty("--primary-color", "white");
    root.style.setProperty("--secondary-color", "#1E1E1E");
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--task-color", "white");
    root.style.setProperty("--footer-color", "#1E1E1E");
    root.style.setProperty("--theme-btn", `url('assets/Dark-theme-btn.svg')`);
    root.style.setProperty("--container-bg", `url('./assets/Light-empty.svg')`);
  }
});
