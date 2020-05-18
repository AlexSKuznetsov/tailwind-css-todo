// кнопки
const input = document.getElementById("input");
const button = document.querySelector("#button");
const ul = document.querySelector("ul");
const removeButton = document.querySelector("#remove-all");
const filter = document.querySelector("#filter");

// стили
const svg = `
  <svg class="cursor-pointer ml-10 h-5 w-5 fill-current text-red-500" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12"></path>
  </svg>`;

const taskStyle = `flex justify-between p-2 m-1 items-center border border-gray-400 hover:border-black hover:bg-yellow-100 rounded-sm`;

// запуск событий
startEventListener();

// события
function startEventListener() {
  //добавление задачи
  button.addEventListener("click", addTask);

  //удаление отдельной задачи
  ul.addEventListener("click", removeTask);

  //удаление всех задач
  removeButton.addEventListener("click", removeAllTask);

  //фильтрация задач
  filter.addEventListener("keyup", filterTask);
}

// добавление задачи в список
function addTask(e) {
  if (input.value !== "") {
    const newLi = document.createElement("li");
    newLi.className = taskStyle;
    newLi.append(document.createTextNode(input.value));
    ul.append(newLi);

    const link = document.createElement("a");
    link.className = "delete-item";
    link.innerHTML = svg;
    newLi.append(link);

    e.preventDefault();
  } else {
    alert("Введите текст");
  }
  input.value = "";
}

// удаление отдельной задачи из списка
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
  e.preventDefault();
}

// удаление всех задач из списка
function removeAllTask(e) {
  //ul.innerHTML = "";

  //так быстрее
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

// фильтрация задач
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll("li").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
