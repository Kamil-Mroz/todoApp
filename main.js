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
  todoArr: [],
  isLight: false,
};

init();

function init() {
  todo["isLight"] = getLocalStorage("colorTheme");

  if (todo["isLight"]) body.classList.add("light");

  todo.todoArr = getLocalStorage("todoArr");

  if (!todo.todoArr) return (todo.todoArr = []);
  todo["todoArr"].forEach((element) => {
    render(element);
  });
}

btnRemove.addEventListener("click", function () {
  dane = getLocalStorage("todoArr");
  if (!dane) return;

  if (!confirm("Are you sure you want to remove all your tasks?")) {
    return;
  }

  localStorage.removeItem("todoArr");
  window.location.reload(true);
});

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!inputEl.value) {
    return displayNotifications("error");
  }
  const data = inputEl.value;

  inputEl.value = "";

  render(data);

  displayNotifications("added");

  todo["todoArr"].push(data);

  setLocalStorage("todoArr", todo.todoArr);
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

function displayNotifications(action) {
  const text = {
    added: "Added activity",
    done: "Finished successfully",
    error: "Enter an input value",
    removeAll: "Removed all tasks",
  };

  const notify = document.createElement("div");

  notify.classList.add(action);
  notify.innerText = text[action];
  notificationsEl.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 4000);
}

function render(data) {
  const text = `
    <li class="todo__item ">
    <span class="todo__text">${data}</span>
    <button class="btn btn--done" id="done">
    <ion-icon name="checkmark-circle-outline"></ion-icon>
    </button>
    <button class="btn btn--delete" id="delete">
    <ion-icon name="trash-outline" class="icon"></ion-icon>
    </button>
    </li>`;
  list.insertAdjacentHTML("afterbegin", text);
}
