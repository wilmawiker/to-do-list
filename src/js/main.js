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

  let newTask = new Task(title, description, Date(), "", false);
  console.log(newTask);
  unfinishedTasks.push(newTask);
  let taskItemText = JSON.stringify(unfinishedTasks);
  localStorage.setItem("unfinishedTaskItem", taskItemText);
  closeFormForNewTask();
  loadUnfinishedTasks();
}

function createCard(listItemAndIndex, parentContainer) {
  let toDoCard = document.createElement("section");
  toDoCard.classList.add("to-do-card");
  parentContainer.appendChild(toDoCard);

  let title = document.createElement("h1");
  title.innerText = listItemAndIndex.title;

  let description = document.createElement("p");
  description.innerText = listItemAndIndex.description;

  let dateAndCheckbox = document.createElement("div");
  dateAndCheckbox.classList.add("date-and-checkbox");

  toDoCard.appendChild(title);
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

  function checkCheckbox(checkbox, task) {
    if (checkbox.checked) {
      console.log("Checkbox is checked");
      task.completed = true;
      task.dateCompleted = Date();

      finishedTasks.push(task);

      let index = unfinishedTasks.indexOf(task);
      unfinishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(finishedTasks);
      localStorage.setItem("finishedTaskItem", taskItemText);

      taskItemText = JSON.stringify(unfinishedTasks);
      localStorage.setItem("unfinishedTaskItem", taskItemText);

      console.log(unfinishedTasks);
      console.log(finishedTasks);

      //Hämtar korten igen så sidan "uppdateras" utan att laddas om
      loadUnfinishedTasks();
      loadFinishedTasks();
    } else {
      console.log("Checkbox is unchecked");
      task.completed = false;
      task.dateCompleted = "";

      unfinishedTasks.push(task);

      let index = finishedTasks.indexOf(task);
      finishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(unfinishedTasks);
      localStorage.setItem("unfinishedTaskItem", taskItemText);

      taskItemText = JSON.stringify(finishedTasks);
      localStorage.setItem("finishedTaskItem", taskItemText);

      console.log(unfinishedTasks);
      console.log(finishedTasks);
      loadUnfinishedTasks();
      loadFinishedTasks();
    }
  }
}

//Hårdkodade uppgifter om jag behöver cleara loccalStorage och bygga om pga jag förstörde nåt :)
/* 
localStorage.clear();
let tasks = [
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

let taskItemText = JSON.stringify(tasks);
localStorage.setItem("unfinishedTaskItem", taskItemText); */

let unfinishedTask = localStorage.getItem("unfinishedTaskItem");
let finishedTask = localStorage.getItem("finishedTaskItem");
unfinishedTask = JSON.parse(unfinishedTask);
finishedTask = JSON.parse(finishedTask);
let tasks = [];
if (finishedTask !== null) {
  tasks = unfinishedTask.concat(finishedTask);
  console.log(tasks);
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

//Function för att göra kort som visas på sidan, för varje listobjekt.
function loadUnfinishedTasks() {
  unfinishedToDoCards.innerHTML = "";
  for (let i = 0; i < unfinishedTasks.length; i++) {
    createCard(unfinishedTasks[i], unfinishedToDoCards);
    /* let toDoCard = document.createElement("section");
    toDoCard.classList.add("to-do-card");
    unfinishedToDoCards.appendChild(toDoCard);

    let title = document.createElement("h1");
    title.innerText = unfinishedTasks[i].title;

    let description = document.createElement("p");
    description.innerText = unfinishedTasks[i].description;

    let dateAndCheckbox = document.createElement("div");
    dateAndCheckbox.classList.add("date-and-checkbox");

    toDoCard.appendChild(title);
    toDoCard.appendChild(description);
    toDoCard.appendChild(dateAndCheckbox);

    let dateCreated = document.createElement("p");
    dateCreated.innerText = "Skapad: " + unfinishedTasks[i].dateCreated;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = unfinishedTasks[i].completed;
    checkbox.classList.add("checkbox");
    checkbox.classList.add("checkbox--checked");

    dateAndCheckbox.appendChild(dateCreated);
    dateAndCheckbox.appendChild(checkbox);

    checkbox.addEventListener("change", () => {
      checkCheckbox(checkbox, unfinishedTasks[i]);
    }); */
  }

  //Function som kollar om checkboxen är ikryssad(true), om ja så flyttas objektet/den klara uppgiften till listan för avklarade uppgifter
  /* function checkCheckbox(checkbox, unfinishedTask) {
    if (checkbox.checked) {
      console.log("Checkbox is checked");
      unfinishedTask.completed = true;
      unfinishedTask.dateCompleted = Date();

      finishedTasks.push(unfinishedTask);

      let index = unfinishedTasks.indexOf(unfinishedTask);
      unfinishedTasks.splice(index, 1);

      let taskItemText = JSON.stringify(finishedTasks);
      localStorage.setItem("finishedTaskItem", taskItemText);

      taskItemText = JSON.stringify(unfinishedTasks);
      localStorage.setItem("unfinishedTaskItem", taskItemText);

      console.log(unfinishedTasks);
      console.log(finishedTasks);

      //Hämtar korten igen så sidan "uppdateras" utan att laddas om
      loadUnfinishedTasks();
      loadFinishedTasks();
    }
  } */
}

function loadFinishedTasks() {
  finishedToDoCards.innerHTML = "";
  for (let i = 0; i < finishedTasks.length; i++) {
    createCard(finishedTasks[i], finishedToDoCards);
  }

  // function checkCheckbox(checkbox, finishedTask) {
  //   if (!checkbox.checked) {
  //     console.log("Checkbox is unchecked");
  //     finishedTask.completed = false;
  //     finishedTask.dateCompleted = "";

  //     unfinishedTasks.push(finishedTask);

  //     let index = finishedTasks.indexOf(finishedTask);
  //     finishedTasks.splice(index, 1);

  //     let taskItemText = JSON.stringify(unfinishedTasks);
  //     localStorage.setItem("unfinishedTaskItem", taskItemText);

  //     taskItemText = JSON.stringify(finishedTasks);
  //     localStorage.setItem("finishedTaskItem", taskItemText);

  //     console.log(unfinishedTasks);
  //     console.log(finishedTasks);
  //     loadUnfinishedTasks();
  //     loadFinishedTasks();
  //   }
  // }
}

//Skapar lyssnare på knappen som öppnar forumläret för att skapa en ny uppgift
let addNewTaskBtn = document.getElementById("new-task-btn");
addNewTaskBtn.addEventListener("click", openFormForNewTask);

let cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", closeFormForNewTask);

let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", addNewTask);

let container = document.createElement("main");
container.classList.add("container");
document.body.appendChild(container);

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
