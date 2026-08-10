/* =========================================
   FLUFFY DAYS — TIMER
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const timeDisplay =
    document.getElementById("timeDisplay");

const startButton =
    document.getElementById("startButton");

const resetButton =
    document.getElementById("resetButton");

const skipButton =
    document.getElementById("skipButton");

const progressRing =
    document.getElementById("progressRing");

const timerStatus =
    document.getElementById("timerStatus");

const timerEmoji =
    document.getElementById("timerEmoji");

const sessionCount =
    document.getElementById("sessionCount");

const messageText =
    document.getElementById("messageText");

const messageEmoji =
    document.getElementById("messageEmoji");

const minutesInput =
    document.getElementById("minutesInput");

const secondsInput =
    document.getElementById("secondsInput");

const setCustomButton =
    document.getElementById("setCustomButton");

const modeButtons =
    document.querySelectorAll(".mode-button");


/* =========================================
   VARIABLES
========================================= */

let totalSeconds = 25 * 60;

let remainingSeconds = totalSeconds;

let timer = null;

let isRunning = false;

let completedSessions =
    Number(
        localStorage.getItem(
            "fluffyTimerSessions"
        )
    ) || 0;


/* =========================================
   CIRCLE
========================================= */

const circleLength = 816.8;


/* =========================================
   DISPLAY
========================================= */

function updateDisplay() {

    const minutes =
        Math.floor(
            remainingSeconds / 60
        );

    const seconds =
        remainingSeconds % 60;

    timeDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    const progress =
        1 -
        (
            remainingSeconds /
            totalSeconds
        );


    progressRing.style.strokeDashoffset =
        circleLength -
        (
            progress *
            circleLength
        );

}


/* =========================================
   START
========================================= */

startButton.addEventListener(
    "click",
    () => {

        if (isRunning) {

            pauseTimer();

        } else {

            startTimer();

        }

    }
);


function startTimer() {

    isRunning = true;

    startButton.textContent =
        "Pause";

    timerStatus.textContent =
        "You're doing great ♡";

    timerEmoji.textContent =
        "🌷";


    timer =
        setInterval(
            tick,
            1000
        );

}


function pauseTimer() {

    isRunning = false;

    clearInterval(timer);

    timer = null;

    startButton.textContent =
        "Continue";

    timerStatus.textContent =
        "Taking a tiny pause ☁️";

}


/* =========================================
   TICK
========================================= */

function tick() {

    if (
        remainingSeconds <= 0
    ) {

        completeSession();

        return;

    }

    remainingSeconds--;

    updateDisplay();

}


/* =========================================
   COMPLETE
========================================= */

function completeSession() {

    clearInterval(timer);

    timer = null;

    isRunning = false;

    completedSessions++;

    localStorage.setItem(
        "fluffyTimerSessions",
        completedSessions
    );

    sessionCount.textContent =
        completedSessions;

    startButton.textContent =
        "Start again";

    timerStatus.textContent =
        "You did it! ♡";

    timerEmoji.textContent =
        "🎀";

    messageEmoji.textContent =
        "🌸";

    messageText.textContent =
        "You finished a little session!";

    updateDisplay();

}


/* =========================================
   RESET
========================================= */

resetButton.addEventListener(
    "click",
    resetTimer
);


function resetTimer() {

    clearInterval(timer);

    timer = null;

    isRunning = false;

    remainingSeconds =
        totalSeconds;

    startButton.textContent =
        "Start";

    timerStatus.textContent =
        "Ready when you are ♡";

    timerEmoji.textContent =
        "🌸";

    messageEmoji.textContent =
        "☁️";

    messageText.textContent =
        "You don't have to rush.";

    updateDisplay();

}


/* =========================================
   SKIP
========================================= */

skipButton.addEventListener(
    "click",
    () => {

        completeSession();

    }
);


/* =========================================
   PRESET MODES
========================================= */

modeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                modeButtons.forEach(
                    other =>
                        other.classList.remove(
                            "active"
                        )
                );

                button.classList.add(
                    "active"
                );

                const minutes =
                    Number(
                        button.dataset.minutes
                    );

                totalSeconds =
                    minutes * 60;

                remainingSeconds =
                    totalSeconds;

                minutesInput.value =
                    minutes;

                secondsInput.value =
                    "00";

                resetTimer();

            }
        );

    }
);


/* =========================================
   CUSTOM TIME
========================================= */

setCustomButton.addEventListener(
    "click",
    () => {

        let minutes =
            Number(
                minutesInput.value
            );

        let seconds =
            Number(
                secondsInput.value
            );


        if (
            !Number.isFinite(minutes) ||
            minutes < 0
        ) {

            minutes = 0;

        }


        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {

            seconds = 0;

        }


        if (seconds > 59) {

            seconds = 59;

        }


        if (
            minutes === 0 &&
            seconds === 0
        ) {

            minutes = 1;

        }


        totalSeconds =
            (
                minutes * 60
            ) +
            seconds;


        remainingSeconds =
            totalSeconds;


        modeButtons.forEach(
            button =>
                button.classList.remove(
                    "active"
                )
        );


        resetTimer();

        timerStatus.textContent =
            "Your custom time is ready ♡";

    }
);


/* =========================================
   SESSION COUNT
========================================= */

sessionCount.textContent =
    completedSessions;


/* =========================================
   INITIAL DISPLAY
========================================= */

updateDisplay();
