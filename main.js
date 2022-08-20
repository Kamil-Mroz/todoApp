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

let dane;
let todo = {
  todoObject: {},
  isLight: false,
  isMarked: [],
};

init();

function init() {
  todo["isLight"] = getLocalStorage("colorTheme");

  if (todo["isLight"]) body.classList.add("light");

  todo.todoObject = getLocalStorage("todoObject");

  if (!todo.todoObject) return (todo.todoObject = {});

  for (const [id, marked] of Object.entries(todo.todoObject)) {
    render(id, marked);
  }
}

btnRemove.addEventListener("click", function () {
  dane = getLocalStorage("todoObject");
  const isEmpty = Object.keys(dane).length === 0;
  if (!dane || isEmpty) return;

  if (!confirm("Are you sure you want to remove all your tasks?")) {
    return;
  }

  localStorage.removeItem("todoObject");
  window.location.reload(true);
});

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = inputEl.value;

  if (!data || !isNaN(+data)) {
    inputEl.value = "";
    return displayNotifications("error");
  }

  inputEl.value = "";

  render(data);

  displayNotifications("added");

  todo.todoObject[`${data}`] = false;

  setLocalStorage("todoObject", todo.todoObject);
});

function setLocalStorage(item, save) {
  localStorage.setItem(item, JSON.stringify(save));
}

function getLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

colorMode.addEventListener("click", function () {
  body.classList.toggle("light");
  todo["isLight"] = todo["isLight"]
    ? (todo["isLight"] = false)
    : (todo["isLight"] = true);
  setLocalStorage("colorTheme", todo["isLight"]);
});

function displayNotifications(action, variable = true) {
  const text = {
    added: "Added activity",
    done: "Taks completed",
    error: "Enter an input value",
    removeAll: "Removed all tasks",
    remove: "Task removed",
    unmarked: "Taks unmarked",
  };

  const notify = document.createElement("div");

  if (!variable) action = "unmarked";
  notify.classList.add(action);
  notify.innerText = text[action];

  notificationsEl.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 4000);
}

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

list.addEventListener("click", function (e) {
  e.preventDefault();
  if (!list.children.length) return;
  const el = e.target;
  const text = el.closest(".todo__item").innerText;
  const btn = el.closest(".btn");

  if (!btn) return;
  if (btn.classList.contains("btn--done"))
    done(el.closest(".todo__item"), text);

  if (btn.classList.contains("btn--delete")) {
    el.closest(".todo__item").remove();
    displayNotifications("remove");
    todo.todoObject = getLocalStorage("todoObject");
    delete todo.todoObject[text];

    setLocalStorage("todoObject", todo.todoObject);
  }
});

function done(li, id) {
  li.classList.toggle("doneTask");
  todo.todoObject = getLocalStorage("todoObject");

  todo.todoObject[id]
    ? (todo.todoObject[id] = false)
    : (todo.todoObject[id] = true);

  displayNotifications("done", todo.todoObject[id]);
  setLocalStorage("todoObject", todo.todoObject);
}
