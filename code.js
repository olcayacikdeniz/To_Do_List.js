let task = document.querySelector("#task")
let successToast = document.querySelector("#successToast");
let dangerToast = document.querySelector("#dangerToast");
let taskList = document.querySelector("#taskList");

function newElement() {
    if (!task.value || task.value.includes("  ") || task.value == " ")
        ShowErrorAlert();
    else {
        let tasks = GetTasksFromLocalStorage();

        tasks.push(task.value);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        task.value = "";
        ShowSuccessAlert();
        ShowTasks();
    }
}

function ShowTasks() {
    let tasks = GetTasksFromLocalStorage();

    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = task;

        const todoRemoveButton = document.createElement('i')
        todoRemoveButton.classList.add('bi', 'bi-trash3-fill', 'float-right', 'mr-4')
        todoRemoveButton.addEventListener("click", () => RemoveFromLocalStorage(index));

        li.addEventListener("click", () => CheckTask(li));

        li.appendChild(todoRemoveButton);
        taskList.appendChild(li);
    });
}

function RemoveFromLocalStorage(index) {
    let tasks = GetTasksFromLocalStorage();

    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    ShowTasks();
}

function CheckTask(li) {
    if (li.classList.contains("checked")) {
        li.classList.remove("checked");
    } else {
        li.classList.add("checked");
    }
}

function GetTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function ShowSuccessAlert() {
    let success = new bootstrap.Toast(successToast, alertOptions);
    success.show();
}

function ShowErrorAlert() {
    let error = new bootstrap.Toast(dangerToast, alertOptions);
    error.show();
}

let alertOptions = {
    animation: true,
    delay: 3000,
}

ShowTasks();
