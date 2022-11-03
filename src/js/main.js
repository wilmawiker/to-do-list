import { Task } from "./models/task";

//Skapar upp två tomma listor
let unfinishedTasks = [];
let finishedTasks = [];

//Funktion som byter css-klass på HTML-elementet och därmed gör formuläret synligt.
function openFormForNewTask() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  title.value = "";
  description.value = "";
  let formContainer = document.getElementById("form-container");
  formContainer.className = "form-container--visible";
}

//Funktion som byter css-klass på HTML-elementet och gör formuläret osynligt igen.
function closeFormForNewTask() {
  let formContainer = document.getElementById("form-container");
  formContainer.className = "form-container--hidden";
}
//Funktion för att skapa en ny uppgift och lägger till den i rätt lista.
function addNewTask() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  let newTask = new Task(title, description, formatDate(new Date()), "", false);
  unfinishedTasks.push(newTask);
  let taskItemText = JSON.stringify(unfinishedTasks);
  localStorage.setItem("unfinishedTaskItem", taskItemText);
  closeFormForNewTask();
  loadUnfinishedTasks();
}

//Om talet vi hämtar endast innehåller en siffra så lägger den på en 0
function formatToTwoDigits(number) {
  return number.toString().padStart(2, "0");
}

//Funktion som ändrar datumet till dd-mm-yyyy
function formatDate(date) {
  return [
    formatToTwoDigits(date.getDate()),
    formatToTwoDigits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("-");
}

//Skapar kort
function createCard(listItemAndIndex, parentContainer) {
  let toDoCard = document.createElement("section");
  toDoCard.classList.add("to-do-card");
  parentContainer.appendChild(toDoCard);

  let titleAndRemovBtn = document.createElement("div");
  titleAndRemovBtn.classList.add("date-checkbox-title-and-remove-btn");

  let title = document.createElement("h1");
  title.innerText = listItemAndIndex.title;

  let removeBtn = document.createElement("i");
  removeBtn.classList.add("bi");
  removeBtn.classList.add("bi-x-lg");

  let description = document.createElement("p");
  description.innerText = listItemAndIndex.description;

  let dateAndCheckbox = document.createElement("div");
  dateAndCheckbox.classList.add("date-checkbox-title-and-remove-btn");

  toDoCard.appendChild(titleAndRemovBtn);
  titleAndRemovBtn.appendChild(title);
  titleAndRemovBtn.appendChild(removeBtn);
  toDoCard.appendChild(description);
  toDoCard.appendChild(dateAndCheckbox);

  let dateCreated = document.createElement("p");
  dateCreated.innerText = "Skapad: " + listItemAndIndex.dateCreated;

  let dateCompleted = document.createElement("p");
  if (listItemAndIndex.dateCompleted !== null) {
    dateCompleted.innerText = "Slutförd: " + listItemAndIndex.dateCompleted;
  } else {
    dateCompleted.innerText = "";
  }

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = listItemAndIndex.completed;
  checkbox.classList.add("checkbox");
  checkbox.classList.add("checkbox--checked");

  dateAndCheckbox.appendChild(dateCreated);
  dateAndCheckbox.appendChild(dateCompleted);
  dateAndCheckbox.appendChild(checkbox);

  checkbox.addEventListener("change", () => {
    checkCheckbox(checkbox, listItemAndIndex);
  });

  removeBtn.addEventListener("click", () => {
    deleteTask(removeBtn, listItemAndIndex);
  });

  //Funktion som flyttar uppgifter mellan listor när checkboxen för objektet ändras.
  function checkCheckbox(checkbox, task) {
    if (checkbox.checked) {
      task.completed = true;
      task.dateCompleted = formatDate(new Date());

      finishedTasks.push(task);

      let index = unfinishedTasks.indexOf(task);
      unfinishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(finishedTasks);
      localStorage.setItem("finishedTaskItem", taskItemText);

      taskItemText = JSON.stringify(unfinishedTasks);
      localStorage.setItem("unfinishedTaskItem", taskItemText);

      //Hämtar korten igen så sidan "uppdateras" utan att laddas om
      loadUnfinishedTasks();
      loadFinishedTasks();
    }
    //Gör tvärtom om checkboxen ändras.
    else {
      task.completed = false;
      task.dateCompleted = "";

      unfinishedTasks.push(task);

      let index = finishedTasks.indexOf(task);
      finishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(unfinishedTasks);
      localStorage.setItem("unfinishedTaskItem", taskItemText);

      taskItemText = JSON.stringify(finishedTasks);
      localStorage.setItem("finishedTaskItem", taskItemText);

      loadUnfinishedTasks();
      loadFinishedTasks();
    }
  }

  //Funktion som tar bort uppgiften
  function deleteTask(button, task) {
    if (task.completed === false) {
      let index = unfinishedTasks.indexOf(task);
      unfinishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(unfinishedTasks);
      localStorage.setItem("unfinishedTaskItem", taskItemText);
    } else {
      let index = finishedTasks.indexOf(task);
      finishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(finishedTasks);
      localStorage.setItem("finishedTaskItem", taskItemText);
    }
    loadUnfinishedTasks();
    loadFinishedTasks();
  }
}

//Funktion som sorterar oklara objekt på datum de är skapade
function sortUnfinishedTasks() {
  unfinishedTasks.reverse();
  loadUnfinishedTasks();
}

//Hårdkodade uppgifter som presenteras om inget redan ligger i localStorage
if (localStorage.getItem("unfinishedTaskItem") === null) {
  let startTasks = [
    new Task(
      "JavaScript Inlämning",
      "Skapa en to do lista i JavaScript",
      "31-10-2022",
      "",
      false
    ),
    new Task(
      "Gym",
      "Knäböj 1x3 95kg, Hip Thrusts 3x5 140kg",
      "31-10-2022",
      "",
      false
    ),
    new Task(
      "Kompetensportfölj Inlämning",
      "LIA kartläggning, kompetensinventering, CV, personligt brev, LinkedIn",
      "10-10-2022",
      false
    ),
  ];

  let taskItemText = JSON.stringify(startTasks);
  localStorage.setItem("unfinishedTaskItem", taskItemText);
}

//Hämtar listorna från localStorage, kollar om listan med klara uppgifter är tom, annars lägger den ihop dem till en lista för att senare kunna dela upp dem i separat listor.
let unfinishedTask = localStorage.getItem("unfinishedTaskItem");
let finishedTask = localStorage.getItem("finishedTaskItem");
unfinishedTask = JSON.parse(unfinishedTask);
finishedTask = JSON.parse(finishedTask);
let tasks = [];
if (finishedTask !== null) {
  tasks = unfinishedTask.concat(finishedTask);
  if (finishedTask !== []) {
    tasks = unfinishedTask.concat(finishedTask);
  }
} else {
  tasks = unfinishedTask;
}

//Delar in uppgifterna i rätt lista beroende på om completed är true eller false
for (let i = 0; i < tasks.length; i++) {
  if (tasks[i].completed === true) {
    finishedTasks.push(tasks[i]);
    let taskItemText = JSON.stringify(finishedTasks);
    localStorage.setItem("finishedTaskItem", taskItemText);
  } else {
    unfinishedTasks.push(tasks[i]);
    let taskItemText = JSON.stringify(unfinishedTasks);
    localStorage.setItem("unfinishedTaskItem", taskItemText);
  }
}

//Funktioner för att göra kort som visas på sidan, för varje listobjekt.
function loadUnfinishedTasks() {
  unfinishedToDoCards.innerHTML = "";
  for (let i = 0; i < unfinishedTasks.length; i++) {
    createCard(unfinishedTasks[i], unfinishedToDoCards);
  }
}

function loadFinishedTasks() {
  finishedToDoCards.innerHTML = "";
  for (let i = 0; i < finishedTasks.length; i++) {
    createCard(finishedTasks[i], finishedToDoCards);
  }
}

//Skapar lyssnare på knappen som öppnar forumläret för att skapa en ny uppgift
let addNewTaskBtn = document.getElementById("new-task-btn");
addNewTaskBtn.addEventListener("click", openFormForNewTask);

//Skapar lyssnare på knappen som stänger forumläret för att skapa en ny uppgift
let cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", closeFormForNewTask);

//Skapar lyssnare på knappen som sparar forumläret för att skapa en ny uppgift
let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", addNewTask);

//Skapar upp sidan med HTML-element
let container = document.createElement("main");
container.classList.add("container");
document.body.appendChild(container);

let sortList = document.createElement("button");
sortList.classList.add("sort-btn");
sortList.innerText = "Sortera uppgifter på datum";
container.appendChild(sortList);

//Lyssnare för att sortera
sortList.addEventListener("click", sortUnfinishedTasks);

let unfinishedToDoCards = document.createElement("div");
unfinishedToDoCards.classList.add("unfinished-to-do-cards");
container.appendChild(unfinishedToDoCards);

let toDoCardsDivider = document.createElement("div");
toDoCardsDivider.classList.add("to-do-cards-divider");
container.appendChild(toDoCardsDivider);

let solidLineDivider = document.createElement("hr");
solidLineDivider.classList.add("solid");
toDoCardsDivider.appendChild(solidLineDivider);

let finishedTasksText = document.createElement("h3");
finishedTasksText.innerText = "Färdiga uppgifter";

toDoCardsDivider.appendChild(finishedTasksText);

let finishedToDoCards = document.createElement("div");
finishedToDoCards.classList.add("finished-to-do-cards");
container.appendChild(finishedToDoCards);

loadUnfinishedTasks();
loadFinishedTasks();
