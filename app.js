/* ==========================================
   FLUFFY DAYS
   Main Application
========================================== */


/* ------------------------------------------
   ELEMENTS
------------------------------------------ */

const nameInput = document.getElementById("nameInput");
const enterButton = document.getElementById("enterButton");

const welcomeScreen = document.getElementById("welcomeScreen");
const app = document.getElementById("app");

const userGreeting = document.getElementById("userGreeting");
const dateText = document.getElementById("dateText");

const themeButtons = document.querySelectorAll(".theme");


/* ------------------------------------------
   THEME SELECTION
------------------------------------------ */

let selectedTheme = localStorage.getItem("fluffyTheme") || "pink";

applyTheme(selectedTheme);

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedTheme = button.dataset.theme;

        applyTheme(selectedTheme);

        localStorage.setItem(
            "fluffyTheme",
            selectedTheme
        );

    });

});


function applyTheme(theme) {

    document.body.classList.remove(
        "theme-blue",
        "theme-yellow"
    );

    if (theme === "blue") {
        document.body.classList.add("theme-blue");
    }

    if (theme === "yellow") {
        document.body.classList.add("theme-yellow");
    }

    themeButtons.forEach(button => {

        button.classList.toggle(
            "selected",
            button.dataset.theme === theme
        );

    });
}


/* ------------------------------------------
   NAME
------------------------------------------ */

const savedName = localStorage.getItem("fluffyName");

if (savedName) {

    nameInput.value = savedName;

}


/* ------------------------------------------
   ENTER APP
------------------------------------------ */

enterButton.addEventListener("click", enterApp);

nameInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        enterApp();
    }

});


function enterApp() {

    let name = nameInput.value.trim();

    if (!name) {

        nameInput.focus();

        nameInput.placeholder = "Tell me your name first... ♡";

        return;

    }

    localStorage.setItem(
        "fluffyName",
        name
    );

    localStorage.setItem(
        "fluffyTheme",
        selectedTheme
    );


    userGreeting.textContent =
        `${name} ♡`;

    updateDate();


    welcomeScreen.style.animation =
        "cardAppear .5s reverse";


    setTimeout(() => {

        welcomeScreen.classList.add("hidden");

        app.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 450);

}


/* ------------------------------------------
   DATE
------------------------------------------ */

function updateDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    const formattedDate =
        today.toLocaleDateString(
            "en-US",
            options
        );

    dateText.textContent =
        `Today is ${formattedDate} ✦`;

}


/* ------------------------------------------
   LOAD SAVED USER
------------------------------------------ */

if (savedName) {

    userGreeting.textContent =
        `${savedName} ♡`;

    updateDate();

}


/* ------------------------------------------
   FEATURE BUTTONS
------------------------------------------ */

const featureCards =
    document.querySelectorAll(".feature-card");

featureCards.forEach(card => {

    card.addEventListener("click", () => {

        const name =
            card.querySelector("strong").textContent;

        alert(
            `${name} is coming next! ♡`
        );

    });

});


/* ------------------------------------------
   SETTINGS BUTTON
------------------------------------------ */

const settingsButton =
    document.querySelector(".settings-button");

settingsButton.addEventListener("click", () => {

    alert(
        "Settings will be added soon! ✦"
    );

});
