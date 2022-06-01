// Calculater V1.0 //

// variables
var input_string = "";
var operator = "";
var number_shown_on_screen = "";
number_buttons = document.querySelectorAll(".number_button");
operator_button = document.querySelectorAll(".operator_button");
displayed_number = document.querySelector(".displayed_number");
point_button = document.getElementById(".");
equals_button = document.getElementById("equals");

//adds number to string, checks against duplicate operators then prints the number to display div
for (i of number_buttons) {
  i.addEventListener("click", function () {
    if (operator !== "") {
      input_string = input_string.concat(number_shown_on_screen);
      input_string = input_string.concat(operator);
      operator = "";
      number_shown_on_screen = "";
      console.log("current input_string: " + input_string);
    }

    number_shown_on_screen = number_shown_on_screen.concat(this.id);
    console.log(number_shown_on_screen);
    displayed_number.innerText = number_shown_on_screen;
    // input_string = input_string.concat(this.id);
    // console.log(input_string);
    // displayed_number.innerText = input_string;
  });
}

// check if number is present then adds an operator to prevent duplicate
number_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
for (i of operator_button) {
  i.addEventListener("click", function () {
    console.log("operator clicked");
    if (number_shown_on_screen.slice(-1) in number_list) {
      console.log("number_present");
      operator = this.id;
      displayed_number.innerText = operator;
    }
  });
}

// adds a point to the string, only allows one.
point_button.addEventListener("click", function () {
  if (number_shown_on_screen.includes(".", 0) == false) {
    number_shown_on_screen = number_shown_on_screen.concat(point_button.id);
    console.log("point clicked");
    displayed_number.innerText = number_shown_on_screen;
  }
});

// converts to function and gives result
equals_button.addEventListener("click", function () {
  console.log("number on screen " + number_shown_on_screen);
  input_string = input_string.concat(number_shown_on_screen);
  console.log(input_string);
  if (input_string.slice(-1) in number_list) {
    console.log("equals clicked");
    let result = Function("return " + input_string)();
    console.log(result);
    displayed_number.innerText = result;
    input_string = "";
  } else {
    displayed_number.innerText = "Error!";
    console.log("error clear");
    // input_string = "";
    // number_shown_on_screen = "";
  }
  input_string = "";
  number_shown_on_screen = "";
});
