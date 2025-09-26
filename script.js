document.addEventListener("DOMContentLoaded", function () {
    var todoInput = document.getElementById("to-do-input");
    var submitTaskBtn = document.getElementById("add-task-btn");
    var todoList = document.getElementById("to-do-list");
    var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(function (task) { return renderTask(task); });
    submitTaskBtn.addEventListener("click", function () {
        var enteredTask = todoInput.value.trim();
        if (!enteredTask)
            return;
        var newTask = {
            id: Date.now(),
            text: enteredTask,
            isCompleted: false,
        };
        tasks.push(newTask);
        saveTask();
        renderTask(newTask);
        todoInput.value = "";
    });
    function renderTask(task) {
        var li = document.createElement("li");
        li.className = "list";
        var span = document.createElement("span");
        span.textContent = task.text;
        span.className = "spanText";
        var delBtn = document.createElement("button");
        delBtn.className = "delete";
        delBtn.textContent = "Delete";
        li.appendChild(span);
        li.appendChild(delBtn);
        todoList.appendChild(li);
        span.addEventListener("click", function (e) {
            task.isCompleted = !task.isCompleted;
            span.classList.toggle("completed", task.isCompleted);
            saveTask();
        });
        delBtn.addEventListener("click", function (e) {
            e.stopImmediatePropagation();
            tasks = tasks.filter(function (t) { return t.id !== task.id; });
            li.remove();
            saveTask();
        });
    }
    //save tasks in local storage
    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
