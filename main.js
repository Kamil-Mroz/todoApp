const inputEl = document.getElementById("input");
const btnAdd = document.getElementById("add");
const btnDone = document.getElementById("done");
const btnDelete = document.getElementById("delete");
const colorMode = document.querySelector(".color-mode");
const list = document.querySelector(".todo__list");
const formEl = document.getElementById("form");
const body = document.body;
const notificationsEl = document.querySelector(".notifications");

let dane;
let todo = [];
init();

function init() {
  dane = getLocalStorage();

  if (!dane) return;
  todo = dane;
  todo.forEach((element) => {
    render(element);
  });
}

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!inputEl.value) {
    return displayNotifications("error");
  }
  const data = inputEl.value;

  inputEl.value = "";

  render(data);

  displayNotifications("added");

  todo.push(data);

  setLocalStorage();
});

function setLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("todo"));
}

colorMode.addEventListener("click", function () {
  document.body.classList.toggle("light");
});

function displayNotifications(action) {
  const text = {
    added: "Added activity",
    done: "Finished successfully",
    error: "Enter an input value",
  };

  const notify = document.createElement("div");
  const message =
    action === "added" ? "added" : action === "error" ? "error" : action;

  notify.classList.add(action);
  notify.innerText = text[message];
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
