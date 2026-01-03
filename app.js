document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        updateTaskList();
        taskInput.value = ""; // small fix
        updateStats();
        saveTask();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ""} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fa-solid fa-pen-to-square edit-icon" onclick="editTask(${index})"></i>
        <i class="fa-solid fa-trash delete-icon" onclick="deleteTask(${index})"></i>
            </div>
        </div>
        `;

        // small fix: listen on checkbox instead of li
        listItem.querySelector(".checkbox")
            .addEventListener("change", () => toggleTaskCompletion(index));

        taskList.appendChild(listItem);
    });
};

// small missing functions (required, not extra)

const toggleTaskCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTask();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100; // ✅ FIX

    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks){
        blaskConfetti();
    }
};


document.getElementById('newTask').addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

updateStats();


const blaskConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });

}
