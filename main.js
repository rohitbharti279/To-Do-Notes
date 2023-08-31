const taskInput = document.querySelector(".input-text");
const addInputTask = document.getElementById("add-task");

filters = document.querySelectorAll(".filters span");
clearAll = document.querySelector(".clear-btn");
taskBox = document.querySelector(".task-box");


filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

let editId,
    isEditTask = false,
    todos = JSON.parse(localStorage.getItem("todo-list"));


let liTag = "";

function showTodo(filter) {

    liTag = "";
    if (todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label class="d-flex flex-row" for="${id}">
                            
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                            <p class="${completed}">${todo.name}</p>
                                
                            </label>
                            <div class="settings">
                            <ul>
                            <li onclick='deleteTask(${id}, "${filter}")' class="btn border bg-danger"><i class="fa fa-trash"></i></li>
                            </ul>
                        </div>   
                           
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");

}
showTodo("all");


function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
}



function deleteTask(deleteId, filter) {
    todos.splice(deleteId, 1);
    showTodo(filter);
}


clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    showTodo()
});

let userTask = taskInput.value.trim();
let taskInfo = { name: userTask, status: "pending" };

addInputTask.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    if (userTask === taskInfo.name) {
        alert("you entered same task");
    }
    else {
    todos = !todos ? [] : todos;
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo);
    taskInput.value = "";
    showTodo(document.querySelector("span.active").id);
    }
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (userTask === taskInfo.name) {
            alert("you entered same task");
        }
        else {
            if (!isEditTask) {
                todos = !todos ? [] : todos;
                taskInfo = { name: userTask, status: "pending" };
                todos.push(taskInfo);
            } else {
                isEditTask = false;
                todos[editId].name = userTask;
            }
            taskInput.value = "";
            showTodo(document.querySelector("span.active").id);
        }

    }
});
