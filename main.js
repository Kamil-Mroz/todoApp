const inputEl = document.getElementById("input");
const btnAdd = document.getElementById("add");
const btnDone = document.getElementById("done");
const btnDelete = document.getElementById("delete");
const colorMode = document.querySelector(".color-mode");
const list = document.querySelector(".todo__list");
const formEl = document.getElementById("form");

let dane;
let todo = [];
init();
function init() {
  dane = getLocalStorage();
  if (!dane) return;
  todo = dane;
  todo.forEach((element) => {
    const text = `
      <li class="todo__item ">
        <span class="todo__text">${element}</span>
        <button class="btn btn--done" id="done">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
        </button>
        <button class="btn btn--delete" id="delete">
            <ion-icon name="trash-outline" class="icon"></ion-icon>
        </button>
        </li>
    `;
    list.insertAdjacentHTML("afterend", text);
  });
}

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!inputEl.value) {
    return console.log("Please enter a valid input");
  }
  const data = inputEl.value;

  inputEl.value = "";

  const text = `
  <li class="todo__item ">
  <span class="todo__text">${data}</span>
  <button class="btn btn--done" id="done">
  <ion-icon name="checkmark-circle-outline"></ion-icon>
  </button>
  <button class="btn btn--delete" id="delete">
  <ion-icon name="trash-outline" class="icon"></ion-icon>
  </button>
  </li>
  `;
  list.insertAdjacentHTML("afterend", text);

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
