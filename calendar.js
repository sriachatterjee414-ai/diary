/* =========================================
   FLUFFY DAYS — CALENDAR
========================================= */

const calendarGrid =
    document.getElementById("calendarGrid");

const monthTitle =
    document.getElementById("monthTitle");

const yearTitle =
    document.getElementById("yearTitle");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");

const selectedDate =
    document.getElementById("selectedDate");

const eventInput =
    document.getElementById("eventInput");

const addEventButton =
    document.getElementById("addEventButton");

const eventList =
    document.getElementById("eventList");


/* CURRENT DATE */

const today = new Date();

let currentMonth =
    today.getMonth();

let currentYear =
    today.getFullYear();

let selectedDay =
    today.getDate();


/* SAVED EVENTS */

let events =
    JSON.parse(
        localStorage.getItem(
            "fluffyCalendarEvents"
        )
    ) || {};


const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* DATE KEY */

function getDateKey(
    year,
    month,
    day
) {

    return `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

}


/* RENDER */

function renderCalendar() {

    calendarGrid.innerHTML = "";

    monthTitle.textContent =
        monthNames[currentMonth];

    yearTitle.textContent =
        currentYear;


    const firstDay =
        new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


    /* EMPTY DAYS */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "day empty";

        calendarGrid.appendChild(
            empty
        );

    }


    /* DAYS */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement("button");

        button.className =
            "day";

        button.textContent =
            day;


        const key =
            getDateKey(
                currentYear,
                currentMonth,
                day
            );


        /* TODAY */

        if (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ) {

            button.classList.add(
                "today"
            );

        }


        /* SELECTED */

        if (
            day === selectedDay &&
            currentMonth ===
                selectedMonth &&
            currentYear ===
                selectedYear
        ) {

            button.classList.add(
                "selected"
            );

        }


        /* EVENT */

        if (
            events[key] &&
            events[key].length
        ) {

            button.classList.add(
                "has-event"
            );

        }


        button.addEventListener(
            "click",
            () => {

                selectedDay =
                    day;

                selectedMonth =
                    currentMonth;

                selectedYear =
                    currentYear;

                updateSelectedDate();

                renderCalendar();

                renderEvents();

            }
        );


        calendarGrid.appendChild(
            button
        );

    }

}


/* SELECTED DATE */

let selectedMonth =
    today.getMonth();

let selectedYear =
    today.getFullYear();


function updateSelectedDate() {

    selectedDate.textContent =
        `${monthNames[selectedMonth]} ${selectedDay} ♡`;

}


/* CHANGE MONTH */

previousMonth.addEventListener(
    "click",
    () => {

        currentMonth--;

        if (currentMonth < 0) {

            currentMonth = 11;

            currentYear--;

        }

        renderCalendar();

    }
);


nextMonth.addEventListener(
    "click",
    () => {

        currentMonth++;

        if (currentMonth > 11) {

            currentMonth = 0;

            currentYear++;

        }

        renderCalendar();

    }
);


/* EVENTS */

function renderEvents() {

    const key =
        getDateKey(
            selectedYear,
            selectedMonth,
            selectedDay
        );


    eventList.innerHTML = "";


    if (
        !events[key] ||
        events[key].length === 0
    ) {

        eventList.innerHTML =
            `<div class="empty-events">
                Nothing planned yet ☁️
             </div>`;

        return;

    }


    events[key].forEach(
        (event,index) => {

            const item =
                document.createElement("div");

            item.className =
                "event-item";


            item.innerHTML = `
                <span>🌸 ${escapeHtml(event)}</span>

                <button
                    class="delete-event"
                    data-index="${index}"
                >
                    ✕
                </button>
            `;


            item
                .querySelector(
                    ".delete-event"
                )
                .addEventListener(
                    "click",
                    () => {

                        events[key].splice(
                            index,
                            1
                        );

                        saveEvents();

                        renderEvents();

                        renderCalendar();

                    }
                );


            eventList.appendChild(item);

        }
    );

}


/* ADD EVENT */

function addEvent() {

    const text =
        eventInput.value.trim();

    if (!text) return;


    const key =
        getDateKey(
            selectedYear,
            selectedMonth,
            selectedDay
        );


    if (!events[key]) {

        events[key] = [];

    }


    events[key].push(text);

    saveEvents();

    eventInput.value = "";

    renderEvents();

    renderCalendar();

}


addEventButton.addEventListener(
    "click",
    addEvent
);


eventInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addEvent();

        }

    }
);


/* SAVE */

function saveEvents() {

    localStorage.setItem(
        "fluffyCalendarEvents",
        JSON.stringify(events)
    );

}


/* SECURITY */

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* START */

updateSelectedDate();

renderCalendar();

renderEvents();
