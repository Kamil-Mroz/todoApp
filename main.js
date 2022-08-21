const inputEl = document.getElementById("input");
const btnAdd = document.getElementById("add");
const btnDone = document.getElementById("done");
const btnDelete = document.getElementById("delete");
const btnRemove = document.getElementById("removeAll");
const colorMode = document.querySelector(".color-mode");
const list = document.querySelector(".todo__list");
const formEl = document.getElementById("form");
const body = document.body;
const notificationsEl = document.querySelector(".notifications");

init();

function init() {
  todo = {
    todoObject: {},
    isLight: false,
  };

  todo = getLocalStorage("todo");

  if (!todo)
    return (todo = {
      todoObject: {},
      isLight: false,
    });

  checkTheme();

  for (const [id, marked] of Object.entries(todo.todoObject)) {
    render(id, marked);
  }
}
colorMode.addEventListener("click", ChangeTheme);

formEl.addEventListener("submit", formInteraction);

list.addEventListener("click", itemInteraction);

btnRemove.addEventListener("click", removeAllItems);

function render(data, marked) {
  const text = `
    <li class="todo__item ${marked ? "doneTask" : ""}">
    <span class="todo__text">${data}</span>
    <button class="btn btn--done " id="done">
    <ion-icon name="checkmark-circle-outline"></ion-icon>
    </button>
    <button class="btn btn--delete" id="delete">
    <ion-icon name="trash-outline" class="icon"></ion-icon>
    </button>
    </li>`;

  list.insertAdjacentHTML("afterbegin", text);
}

function formInteraction(e) {
  e.preventDefault();

  const data = inputEl.value;

  if (!data || !isNaN(+data)) {
    inputEl.value = "";
    return displayMessage("error");
  }

  inputEl.value = "";

  render(data);

  displayMessage("added");

  todo.todoObject[`${data}`] = false;

  setLocalStorage("todo", todo);
}

function itemInteraction(e) {
  e.preventDefault();

  const el = e.target;
  const id = el.closest(".todo__item").innerText;

  const btn = el.closest(".btn");
  if (!btn) return;

  if (btn.classList.contains("btn--done")) completed(el, id);

  if (btn.classList.contains("btn--delete")) {
    deleteItem(el, id);
  }
}

function removeAllItems() {
  todo = getLocalStorage("todo");
  const isEmpty = Object.keys(todo.todoObject).length === 0;
  if (!todo || isEmpty) return;

  if (!confirm("Are you sure you want to remove all your tasks?")) {
    return;
  }

  list.innerHTML = "";
  todo.todoObject = {};
  displayMessage("removeAll");
  setLocalStorage("todo", todo);
}

function deleteItem(el, id) {
  el.closest(".todo__item").remove();
  displayMessage("remove");
  todo = getLocalStorage("todo");
  delete todo.todoObject[id];

  setLocalStorage("todo", todo);
}

function completed(el, id) {
  el.closest(".todo__item").classList.toggle("doneTask");
  todo = getLocalStorage("todo");

  todo.todoObject[id] = !todo.todoObject[id];

  displayMessage("done", todo.todoObject[id]);
  setLocalStorage("todo", todo);
}

function displayMessage(action, variable = true) {
  const notifications = {
    added: "Added activity",
    done: "Taks completed",
    error: "Enter an input value",
    removeAll: "Removed all tasks",
    remove: "Task removed",
    unmarked: "Taks unmarked",
  };

  const popup = document.createElement("div");

  if (!variable) action = "unmarked";
  popup.classList.add(action);
  popup.innerText = notifications[action];

  notificationsEl.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 4000);
}

function checkTheme() {
  todo = getLocalStorage("todo");
  if (todo["isLight"]) body.classList.add("light");
}

function ChangeTheme() {
  body.classList.toggle("light");
  todo["isLight"] = todo["isLight"]
    ? (todo["isLight"] = false)
    : (todo["isLight"] = true);
  setLocalStorage("todo", todo);
}

function setLocalStorage(item, save) {
  localStorage.setItem(item, JSON.stringify(save));
}

function getLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}
