class Task {
  constructor(title, description, dateCreated, dateCompleted, completed) {
    this.title = title;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dateCompleted = dateCompleted;
    this.completed = completed;
  }
}

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
let unfinishedTasks = [];
let finishedTasks = [];
for (let i = 0; i < tasks.length; i++) {
  if (tasks[i].completed === true) {
    finishedTasks.push(tasks[i]);
  } else {
    unfinishedTasks.push(tasks[i]);
  }
}

let taskItemText = JSON.stringify(unfinishedTasks);
localStorage.setItem("taskItem", taskItemText);

function loadUnfinishedTasks() {
  unfinishedToDoCards.innerHTML = "";
  for (let i = 0; i < unfinishedTasks.length; i++) {
    let toDoCard = document.createElement("section");
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
    });
  }

  function checkCheckbox(checkbox, unfinishedTask) {
    if (checkbox.checked) {
      console.log("Checkbox is checked");
      unfinishedTask.completed = true;
      unfinishedTask.dateCompleted = Date();
      finishedTasks.push(unfinishedTask);
      let index = unfinishedTasks.indexOf(unfinishedTask);
      unfinishedTasks.splice(index, 1);
      console.log(unfinishedTasks);
      console.log(finishedTasks);
      loadUnfinishedTasks();
      loadFinishedTasks();
    }
  }
}

let addNewTaskBtn = document.getElementById("new-task-btn");
addNewTaskBtn.addEventListener("click", openFormForNewTask);

let cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", closeFormForNewTask);

// let submitBtn = document.getElementById("submit-btn");
// submitBtn.addEventListener("click", addNewTask);

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

function loadFinishedTasks() {
  finishedToDoCards.innerHTML = "";
  for (let i = 0; i < finishedTasks.length; i++) {
    let toDoCard = document.createElement("section");
    toDoCard.classList.add("to-do-card");
    finishedToDoCards.appendChild(toDoCard);

    let title = document.createElement("h1");
    title.innerText = finishedTasks[i].title;

    let description = document.createElement("p");
    description.innerText = finishedTasks[i].description;

    let dateAndCheckbox = document.createElement("div");
    dateAndCheckbox.classList.add("date-and-checkbox");
    toDoCard.appendChild(title);
    toDoCard.appendChild(description);
    toDoCard.appendChild(dateAndCheckbox);

    let dateCreated = document.createElement("p");
    dateCreated.innerText = "Skapad: " + finishedTasks[i].dateCreated;

    let dateCompleted = document.createElement("p");
    dateCompleted.innerText = "Slutförd: " + finishedTasks[i].dateCompleted;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = finishedTasks[i].completed;
    checkbox.classList.add("checkbox");
    checkbox.classList.add("checkbox--checked");

    dateAndCheckbox.appendChild(dateCreated);
    dateAndCheckbox.appendChild(dateCompleted);
    dateAndCheckbox.appendChild(checkbox);

    checkbox.addEventListener("change", () => {
      checkCheckbox(checkbox, finishedTasks[i]);
    });
  }

  function checkCheckbox(checkbox, finishedTask) {
    if (!checkbox.checked) {
      console.log("Checkbox is unchecked");
      finishedTask.completed = false;
      finishedTask.dateCompleted = "";
      unfinishedTasks.push(finishedTask);
      let index = finishedTasks.indexOf(finishedTask);
      finishedTasks.splice(index, 1);
      console.log(unfinishedTasks);
      console.log(finishedTasks);
      loadUnfinishedTasks();
      loadFinishedTasks();
    }
  }
}

loadUnfinishedTasks();
loadFinishedTasks();

function openFormForNewTask() {
  let formContainer = document.getElementById("form-container");
  formContainer.className = "form-container--visible";
}

function closeFormForNewTask() {
  let formContainer = document.getElementById("form-container");
  formContainer.className = "form-container--hidden";
}

// function addNewTask() {
//   let title = document.getElementById("title").value;
//   let description = document.getElementById("description").value;

//   let newTask = new Task(title, description, Date(), "", false);
//   console.log(newTask);
//   unFinishedTasks.push(newTask);
//   closeFormForNewTask();
//  loadUnfinishedTasks();
// }
