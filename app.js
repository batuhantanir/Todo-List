const todoAddInput = document.querySelector("#todoName");
const todoAddButton = document.querySelector("#todoAddButton");
const todoSearchInput = document.querySelector("#todoSearch");
const todoList = document.querySelector(".list-group");
const todoClearButton = document.querySelector("#todoClearButton");
const cardBody = document.querySelectorAll(".card-body")[0];
var items = JSON.parse(localStorage.getItem("todos"));

todoAddButton.addEventListener("click", todoAdd);
window.addEventListener("load", todoAddToUI);
todoClearButton.addEventListener("click", allTodoClear);
todoSearchInput.addEventListener("keyup", searchFilter);

var todos = [];

function todoAdd(e) {
  e.preventDefault();
  if (localStorage.getItem("todos") === null && todoAddInput.value !== "") {
    todos.push(todoAddInput.value.trim());
    localStorage.setItem("todos", JSON.stringify(todos));
    todoAddInput.value = "";
    todos.push(items);
    showAlert("green", "Todo added..");
    refreshPage();
  } else {
    if (todoAddInput.value !== "") {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.push(todoAddInput.value);
      localStorage.setItem("todos", JSON.stringify(todos));
      todoAddInput.value = "";
      showAlert("green", "Todo added..");
      refreshPage();
    } else {
      showAlert("red", "Please enter text..");
    }
  }
}

function showAlert(color, message) {
  const alertMessage = document.createElement("div");
  alertMessage.className = `error`;
  alertMessage.style.background = `${color}`;
  alertMessage.innerHTML = `${message}`;
  cardBody.appendChild(alertMessage);
  setTimeout(() => {
    cardBody.removeChild(alertMessage);
  }, 1000);
}

function refreshPage() {
  setTimeout(() => {
    window.location.reload(true);
  }, 4000);
  setTimeout(() => {
    window.location.reload(false);
  }, 1000);
}

function todoAddToUI() {
  items.forEach((item, index) => {
    let todoItem = document.createElement("li");
    todoItem.className = "list-group-item";
    todoItem.innerHTML = item;
    var todoA = document.createElement("a");
    todoA.href = "#";
    todoA.tabIndex = index;
    todoA.className = "delete-item";
    let todoI = document.createElement("i");
    todoI.className = "bx bx-x-circle";
    todoList.appendChild(todoItem).appendChild(todoA).appendChild(todoI);
    var deleteAButton = document.querySelectorAll(".delete-item")[`${index}`];
    deleteAButton.addEventListener("click", deleteItem);
  });
}

function deleteItem(e) {
  if (e.target.className === "bx bx-x-circle") {
    var todo = e.target.parentElement.tabIndex;
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo1, index) => {
      if (todo === index) {
        todos.splice(index, 1);
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    refreshPage();
  }
}

function allTodoClear() {
  if (JSON.parse(localStorage.getItem("todos")) == null) {
    showAlert("red", "There must be at least 1 todo to delete.");
  } else {
    localStorage.clear();
    showAlert("green", "All todos deleted successfully");
    refreshPage();
  }
}

function searchFilter(e) {
  const value = Array.from(todoList.children);
  const filterValue = e.target.value.toLowerCase().trim();
  if (value && value.length > 0) {
    value.forEach((val) => {
      const todoText = val.innerText.toLowerCase().trim();
      console.log(todoText);
      if (todoText.includes(filterValue)) {
        val.style.display = "flex";
        val.className = "list-group-item";
      } else {
        val.style.display = "none";
        val.className = "list-group-item";
      }
    });
  } else {
    showAlert("red", "Filtreleme yapmak için en az 1 todo bulunmalıdır.");
  }
}
