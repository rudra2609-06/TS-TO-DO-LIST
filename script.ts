document.addEventListener("DOMContentLoaded", () => {
  type Task = {
   readonly id: number;
    text: string;
    isCompleted: boolean;
  };
  const todoInput = document.getElementById("to-do-input") as HTMLInputElement;
  const submitTaskBtn = document.getElementById(
    "add-task-btn"
  ) as HTMLButtonElement;
  const todoList = document.getElementById("to-do-list") as HTMLUListElement;

  let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  tasks.forEach((task) => renderTask(task));

  submitTaskBtn.addEventListener("click", () => {
    const enteredTask: string = todoInput.value.trim();
    if (!enteredTask) return;

    const newTask: Task = {
      id: Date.now(),
      text: enteredTask,
      isCompleted: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = "";
  });

  function renderTask(task: Task): void {
    const li: HTMLLIElement = document.createElement("li");
    li.className = "list";

    const span: HTMLSpanElement = document.createElement("span");
    span.textContent = task.text;
    span.className = "spanText";

    const delBtn: HTMLButtonElement = document.createElement("button");
    delBtn.className = "delete";
    delBtn.textContent = "Delete";

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);

    span.addEventListener("click", (e) => {
      task.isCompleted = !task.isCompleted;
      span.classList.toggle("completed", task.isCompleted);
      saveTask();
    });

    delBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTask();
    });
  }
  //save tasks in local storage
  function saveTask(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
