/* =========================================
   FLUFFY DAYS — TASKS
========================================= */

const taskInput =
    document.getElementById("taskInput");

const categorySelect =
    document.getElementById("categorySelect");

const addTaskButton =
    document.getElementById("addTaskButton");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");

const progressPercent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const dateText =
    document.getElementById("dateText");

const streakCount =
    document.getElementById("streakCount");

const quoteText =
    document.getElementById("quoteText");

const clearCompleted =
    document.getElementById("clearCompleted");

const filters =
    document.querySelectorAll(".filter");


/* =========================================
   DATA
========================================= */

let tasks =
    JSON.parse(
        localStorage.getItem("fluffyTasks")
    ) || [];

let currentFilter = "all";


/* =========================================
   QUOTES
========================================= */

const quotes = [
    "You don't have to do everything today.",
    "Tiny progress is still progress.",
    "Be proud of the little things.",
    "One thing at a time, fluffy friend ♡",
    "Rest is part of getting things done.",
    "You are doing better than you think.",
    "A small step is still a step."
];


/* =========================================
   DATE
========================================= */

const today = new Date();

dateText.textContent =
    today.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric"
        }
    );


/* =========================================
   TODAY KEY
========================================= */

function getTodayKey() {

    const date = new Date();

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;

}


/* =========================================
   ADD TASK
========================================= */

function addTask() {

    const text =
        taskInput.value.trim();

    if (!text) {

        taskInput.focus();

        return;

    }


    const task = {

        id: Date.now(),

        text: text,

        category:
            categorySelect.value,

        completed: false,

        completedDate: null,

        created:
            getTodayKey()

    };


    tasks.unshift(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();

    updateStreak();

    taskInput.focus();

}


addTaskButton.addEventListener(
    "click",
    addTask
);


taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    taskList.innerHTML = "";


    let visibleTasks =
        tasks.filter(
            task => {

                if (
                    currentFilter ===
                    "active"
                ) {

                    return !task.completed;

                }


                if (
                    currentFilter ===
                    "completed"
                ) {

                    return task.completed;

                }


                return true;

            }
        );


    if (
        visibleTasks.length === 0
    ) {

        emptyMessage.style.display =
            "block";

    } else {

        emptyMessage.style.display =
            "none";

    }


    visibleTasks.forEach(
        task => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "task-item";


            if (task.completed) {

                item.classList.add(
                    "completed"
                );

            }


            item.innerHTML = `

                <button
                    class="task-checkbox"
                    aria-label="Complete task"
                >
                    ${
                        task.completed
                            ? "✓"
                            : ""
                    }
                </button>

                <div class="task-content">

                    <strong>
                        ${escapeHtml(task.text)}
                    </strong>

                    <small>
                        ${escapeHtml(task.category)}
                    </small>

                </div>

                <button
                    class="delete-task"
                    aria-label="Delete task"
                >
                    ✕
                </button>

            `;


            /* COMPLETE BUTTON */

            const checkbox =
                item.querySelector(
                    ".task-checkbox"
                );


            checkbox.addEventListener(
                "click",
                () => {

                    task.completed =
                        !task.completed;


                    if (
                        task.completed
                    ) {

                        task.completedDate =
                            getTodayKey();

                    } else {

                        task.completedDate =
                            null;

                    }


                    saveTasks();

                    renderTasks();

                    updateStreak();

                }
            );


            /* DELETE BUTTON */

            const deleteButton =
                item.querySelector(
                    ".delete-task"
                );


            deleteButton.addEventListener(
                "click",
                () => {

                    tasks =
                        tasks.filter(
                            currentTask =>
                                currentTask.id !==
                                task.id
                        );


                    saveTasks();

                    renderTasks();

                    updateStreak();

                }
            );


            taskList.appendChild(item);

        }
    );


    updateProgress();

}


/* =========================================
   PROGRESS
========================================= */

function updateProgress() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    let percentage = 0;


    if (total > 0) {

        percentage =
            Math.round(
                (
                    completed /
                    total
                ) * 100
            );

    }


    progressPercent.textContent =
        `${percentage}%`;

    progressFill.style.width =
        `${percentage}%`;


    updateQuote(
        percentage
    );

}


/* =========================================
   MOTIVATIONAL MESSAGE
========================================= */

function updateQuote(
    percentage
) {

    if (
        percentage === 100 &&
        tasks.length > 0
    ) {

        quoteText.textContent =
            "You did everything! I'm so proud of you ♡";

        return;

    }


    if (percentage >= 75) {

        quoteText.textContent =
            "Almost there! You've got this ✨";

        return;

    }


    if (percentage >= 50) {

        quoteText.textContent =
            "Look at you go! 🌸";

        return;

    }


    /*
       Pick a random quote only when
       there isn't a special message.
    */

    quoteText.textContent =
        quotes[
            Math.floor(
                Math.random() *
                quotes.length
            )
        ];

}


/* =========================================
   FILTERS
========================================= */

filters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(
                    button =>
                        button.classList.remove(
                            "active"
                        )
                );


                filter.classList.add(
                    "active"
                );


                currentFilter =
                    filter.dataset.filter;


                renderTasks();

            }
        );

    }
);


/* =========================================
   CLEAR COMPLETED
========================================= */

clearCompleted.addEventListener(
    "click",
    () => {

        tasks =
            tasks.filter(
                task =>
                    !task.completed
            );


        saveTasks();

        renderTasks();

        updateStreak();

    }
);


/* =========================================
   SAVE TASKS
========================================= */

function saveTasks() {

    localStorage.setItem(
        "fluffyTasks",
        JSON.stringify(tasks)
    );

}


/* =========================================
   STREAK
========================================= */

function updateStreak() {

    const completedDates =
        new Set();


    /*
       Collect every date on which
       at least one task was completed.
    */

    tasks.forEach(
        task => {

            if (
                task.completed &&
                task.completedDate
            ) {

                completedDates.add(
                    task.completedDate
                );

            }

        }
    );


    let streak = 0;

    const checkDate =
        new Date();


    /*
       Check today, yesterday,
       the day before, etc.
    */

    while (true) {

        const year =
            checkDate.getFullYear();

        const month =
            String(
                checkDate.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                checkDate.getDate()
            ).padStart(2, "0");


        const dateKey =
            `${year}-${month}-${day}`;


        if (
            completedDates.has(
                dateKey
            )
        ) {

            streak++;

            checkDate.setDate(
                checkDate.getDate() - 1
            );

        } else {

            break;

        }

    }


    streakCount.textContent =
        streak;

}


/* =========================================
   SECURITY
========================================= */

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================
   START APP
========================================= */

renderTasks();

updateStreak();
