// simple script to inject elements to the contents menu

function addMenuItem(link, name) {
  var menuContainer = document.querySelector(".dropdowncontents");
  //create a list element
  var menuItem = document.createElement("li");
  menuItem.setAttribute("class", "menuItem");
  //create an anchor element and use function variables to populate
  var menuLink = document.createElement("a");
  menuLink.setAttribute("href", link);
  menuLink.innerHTML = name;
  // add the menu items to the HTML
  menuItem.appendChild(menuLink);
  menuContainer.appendChild(menuItem);
  // add new line
  // var newLine = document.createElement('br')
  // menuContainer.appendChild(newLine)
}

// Add new Contents here using the function:
addMenuItem("./To_do_list_site/index.html", "To Do List");
addMenuItem("./stopwatch/stopwatch.html", "StopWatch");
addMenuItem("#", "Placeholder 2");
