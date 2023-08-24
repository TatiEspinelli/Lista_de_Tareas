const addTaskButton = document.getElementById("addTaskButton");
const newTaskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");

addTaskButton.addEventListener("click", addTask);

newTaskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Al cargar las tareas
window.addEventListener("load", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    const taskItem = createTaskItem(task.text);
    if (task.done) {
      markTaskDone(taskItem.querySelector(".task_text"));
    }
    taskList.appendChild(taskItem);
  });
});

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    saveTasks(); // Guardar las tareas después de agregar
    newTaskInput.value = "";
  }
}

const sortable = new Sortable(taskList, {
  animation: 150,
  handle: ".drag-handle",
  ghostClass: "ghost-item",
  onUpdate: (event) => {
    // Esta función se ejecuta cuando se finaliza el reordenamiento
    // Puedes realizar acciones aquí, como guardar el nuevo orden en una base de datos
    saveTasks(); // Guardar las tareas después de reordenar
  },
});

function createTaskItem(taskText) {
  const taskItem = document.createElement("li");

  const dragHandle = document.createElement("span");
  dragHandle.textContent = "☰";
  dragHandle.classList.add("drag-handle");

  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;
  taskTextSpan.classList.add("task_text");

  const markDoneButton = document.createElement("button");
  markDoneButton.textContent = "Marcar como Hecha";
  markDoneButton.classList.add("mark-done-button");
  markDoneButton.classList.add("btn");
  markDoneButton.classList.add("btn-success");
  markDoneButton.addEventListener("click", () => {
    markTaskDone(taskTextSpan);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.classList.add("delete-button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.addEventListener("click", () => {
    deleteTask(taskItem);
  });

  taskItem.appendChild(dragHandle);
  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(markDoneButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
}

function markTaskDone(taskTextSpan) {
  taskTextSpan.classList.toggle("done");
  saveTasks(); // Guardar las tareas después de marcar como hecha
}

function deleteTask(taskItem) {
  taskList.removeChild(taskItem);
  saveTasks(); // Guardar las tareas después de eliminar
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((taskItem) => {
    return {
      text: taskItem.querySelector(".task_text").textContent,
      done: taskItem.querySelector(".task_text").classList.contains("done"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const moonIcon = document.getElementById("moonIcon");
const body = document.body;

moonIcon.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  saveDarkModeState(body.classList.contains("dark-mode"));
});

function saveDarkModeState(isDarkMode) {
  localStorage.setItem("darkMode", isDarkMode);
}

// Cargar estado de modo oscuro al cargar la página
window.addEventListener("load", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    body.classList.add("dark-mode");
  }
});
