/* ==========================================
   FLUFFY DAYS — APP.JS
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const nameInput = document.getElementById("nameInput");
const enterButton = document.getElementById("enterButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const app = document.getElementById("app");
const userGreeting = document.getElementById("userGreeting");
const dateText = document.getElementById("dateText");

const themeButtons = document.querySelectorAll(".theme");
const navButtons = document.querySelectorAll(".nav-button");
const featureCards = document.querySelectorAll(".feature-card");


/* ==========================================
   THEME
========================================== */

let selectedTheme =
    localStorage.getItem("fluffyTheme") || "pink";

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

applyTheme(selectedTheme);


themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedTheme = button.dataset.theme;

        localStorage.setItem(
            "fluffyTheme",
            selectedTheme
        );

        applyTheme(selectedTheme);

    });

});


/* ==========================================
   NAME
========================================== */

const savedName =
    localStorage.getItem("fluffyName");

if (savedName && nameInput) {
    nameInput.value = savedName;
}


/* ==========================================
   ENTER APP
========================================== */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        enterApp
    );

}


if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                enterApp();
            }

        }
    );

}


function enterApp() {

    if (!nameInput) return;

    const name =
        nameInput.value.trim();

    if (name === "") {

        nameInput.focus();

        nameInput.placeholder =
            "Tell me your name first... ♡";

        return;

    }


    /* Save information */

    localStorage.setItem(
        "fluffyName",
        name
    );

    localStorage.setItem(
        "fluffyTheme",
        selectedTheme
    );


    /* Update greeting */

    if (userGreeting) {

        userGreeting.textContent =
            `${name} ♡`;

    }


    updateDate();


    /* IMPORTANT:
       Hide welcome screen
       Show actual app
    */

    if (welcomeScreen) {

        welcomeScreen.classList.add(
            "hidden"
        );

    }


    if (app) {

        app.classList.remove(
            "hidden"
        );

    }


    /* Start on Home */

    showPage("home");

}


/* ==========================================
   DATE
========================================== */

function updateDate() {

    if (!dateText) return;

    const today =
        new Date();

    const options = {

        weekday: "long",
        month: "long",
        day: "numeric"

    };

    dateText.textContent =
        `Today is ${
            today.toLocaleDateString(
                "en-US",
                options
            )
        } ✦`;

}


/* ==========================================
   LOAD USER
========================================== */

if (savedName) {

    if (userGreeting) {

        userGreeting.textContent =
            `${savedName} ♡`;

    }

    updateDate();

}


/* ==========================================
   NAVIGATION
========================================== */

navButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            showPage(
                button.dataset.page
            );

        }
    );

});


featureCards.forEach(card => {

    card.addEventListener(
        "click",
        function() {

            showPage(
                card.dataset.page
            );

        }
    );

});


function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    const selectedPage =
        document.getElementById(
            `${pageName}Page`
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    navButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   DIARY
========================================== */

let diaryEntries =
    JSON.parse(
        localStorage.getItem(
            "fluffyDiary"
        )
    ) || [];

let editingEntryId = null;

let selectedMood = "😊";

let selectedFavorite = false;

let favoritesOnly = false;


/* ==========================================
   DIARY ELEMENTS
========================================== */

const diaryModal =
    document.getElementById("diaryModal");

const newEntryButton =
    document.getElementById("newEntryButton");

const emptyNewEntry =
    document.getElementById("emptyNewEntry");

const closeDiary =
    document.getElementById("closeDiary");

const saveEntry =
    document.getElementById("saveEntry");

const entryTitle =
    document.getElementById("entryTitle");

const entryDate =
    document.getElementById("entryDate");

const entryTags =
    document.getElementById("entryTags");

const entryContent =
    document.getElementById("entryContent");

const favoriteToggle =
    document.getElementById("favoriteToggle");

const modalTitle =
    document.getElementById("modalTitle");

const diaryEntriesContainer =
    document.getElementById("diaryEntries");

const emptyDiary =
    document.getElementById("emptyDiary");

const diarySearch =
    document.getElementById("diarySearch");

const favoritesFilter =
    document.getElementById("favoritesFilter");

const moodButtons =
    document.querySelectorAll(".mood");


/* ==========================================
   DIARY EVENT LISTENERS
========================================== */

if (newEntryButton) {

    newEntryButton.addEventListener(
        "click",
        openNewEntry
    );

}


if (emptyNewEntry) {

    emptyNewEntry.addEventListener(
        "click",
        openNewEntry
    );

}


function openNewEntry() {

    editingEntryId = null;

    selectedMood = "😊";

    selectedFavorite = false;


    if (modalTitle)
        modalTitle.textContent = "New Memory";

    if (entryTitle)
        entryTitle.value = "";

    if (entryContent)
        entryContent.value = "";

    if (entryTags)
        entryTags.value = "";

    if (entryDate)
        entryDate.value = getTodayDate();


    updateMoodButtons();

    updateFavoriteButton();


    if (diaryModal) {

        diaryModal.classList.remove(
            "hidden"
        );

    }

}


if (closeDiary) {

    closeDiary.addEventListener(
        "click",
        closeDiaryModal
    );

}


if (diaryModal) {

    diaryModal.addEventListener(
        "click",
        event => {

            if (
                event.target === diaryModal
            ) {

                closeDiaryModal();

            }

        }
    );

}


function closeDiaryModal() {

    if (diaryModal) {

        diaryModal.classList.add(
            "hidden"
        );

    }

}


/* ==========================================
   MOODS
========================================== */

moodButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            selectedMood =
                button.dataset.mood;

            updateMoodButtons();

        }
    );

});


function updateMoodButtons() {

    moodButtons.forEach(button => {

        button.classList.toggle(
            "selected",
            button.dataset.mood === selectedMood
        );

    });

}


/* ==========================================
   FAVORITE
========================================== */

if (favoriteToggle) {

    favoriteToggle.addEventListener(
        "click",
        () => {

            selectedFavorite =
                !selectedFavorite;

            updateFavoriteButton();

        }
    );

}


function updateFavoriteButton() {

    if (!favoriteToggle) return;

    favoriteToggle.classList.toggle(
        "active",
        selectedFavorite
    );

    favoriteToggle.textContent =
        selectedFavorite
            ? "★ Favorite"
            : "☆ Add to favorites";

}


/* ==========================================
   SAVE DIARY
========================================== */

if (saveEntry) {

    saveEntry.addEventListener(
        "click",
        saveDiaryEntry
    );

}


function saveDiaryEntry() {

    if (!entryTitle || !entryContent)
        return;


    const title =
        entryTitle.value.trim();

    const content =
        entryContent.value.trim();


    if (!title) {

        entryTitle.focus();

        return;

    }


    if (!content) {

        entryContent.focus();

        return;

    }


    const tags =
        entryTags
            ? entryTags.value
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0)
            : [];


    if (editingEntryId) {

        const index =
            diaryEntries.findIndex(
                entry =>
                    entry.id === editingEntryId
            );


        if (index !== -1) {

            diaryEntries[index] = {

                ...diaryEntries[index],

                title: title,

                content: content,

                mood: selectedMood,

                date:
                    entryDate
                        ? entryDate.value
                        : getTodayDate(),

                tags: tags,

                favorite:
                    selectedFavorite

            };

        }

    } else {

        diaryEntries.unshift({

            id: Date.now(),

            title: title,

            content: content,

            mood: selectedMood,

            date:
                entryDate
                    ? entryDate.value
                    : getTodayDate(),

            tags: tags,

            favorite: selectedFavorite,

            createdAt:
                new Date().toISOString()

        });

    }


    saveDiary();

    closeDiaryModal();

    renderDiary();

}


/* ==========================================
   SAVE LOCAL STORAGE
========================================== */

function saveDiary() {

    localStorage.setItem(
        "fluffyDiary",
        JSON.stringify(diaryEntries)
    );

}


/* ==========================================
   RENDER DIARY
========================================== */

function renderDiary() {

    if (!diaryEntriesContainer)
        return;


    const search =
        diarySearch
            ? diarySearch.value
                .trim()
                .toLowerCase()
            : "";


    let entries =
        [...diaryEntries];


    if (favoritesOnly) {

        entries =
            entries.filter(
                entry => entry.favorite
            );

    }


    if (search) {

        entries =
            entries.filter(entry => {

                const text =
                    `${entry.title}
                    ${entry.content}
                    ${(entry.tags || []).join(" ")}`;

                return text
                    .toLowerCase()
                    .includes(search);

            });

    }


    diaryEntriesContainer.innerHTML = "";


    if (entries.length === 0) {

        diaryEntriesContainer.style.display =
            "none";

        if (emptyDiary) {

            emptyDiary.style.display =
                "block";

        }

        return;

    }


    diaryEntriesContainer.style.display =
        "grid";


    if (emptyDiary) {

        emptyDiary.style.display =
            "none";

    }


    entries.forEach(entry => {

        const card =
            document.createElement("article");

        card.className =
            "entry-card";


        const tagsHTML =
            (entry.tags || [])
                .map(
                    tag =>
                        `<span class="tag">
                            #${escapeHTML(tag)}
                        </span>`
                )
                .join("");


        card.innerHTML = `

            <div class="entry-top">

                <span class="entry-mood">
                    ${entry.mood || "😊"}
                </span>

                <span class="entry-date">
                    ${formatDate(entry.date)}
                </span>

            </div>


            <h3>
                ${escapeHTML(entry.title)}
            </h3>


            <div class="entry-content">
                ${escapeHTML(entry.content)}
            </div>


            <div class="entry-tags">
                ${tagsHTML}
            </div>


            <div class="entry-actions">

                <button
                    class="entry-action favorite"
                    title="Favorite"
                    onclick="toggleFavorite(${entry.id})"
                >
                    ${entry.favorite ? "★" : "☆"}
                </button>

                <button
                    class="entry-action"
                    title="Edit"
                    onclick="editEntry(${entry.id})"
                >
                    ✏️
                </button>

                <button
                    class="entry-action delete"
                    title="Delete"
                    onclick="deleteEntry(${entry.id})"
                >
                    🗑️
                </button>

            </div>

        `;


        diaryEntriesContainer.appendChild(
            card
        );

    });

}


/* ==========================================
   EDIT
========================================== */

function editEntry(id) {

    const entry =
        diaryEntries.find(
            item => item.id === id
        );


    if (!entry) return;


    editingEntryId = id;

    selectedMood =
        entry.mood || "😊";

    selectedFavorite =
        Boolean(entry.favorite);


    if (modalTitle)
        modalTitle.textContent =
            "Edit Memory";


    if (entryTitle)
        entryTitle.value =
            entry.title;


    if (entryContent)
        entryContent.value =
            entry.content;


    if (entryDate)
        entryDate.value =
            entry.date;


    if (entryTags)
        entryTags.value =
            (entry.tags || []).join(", ");


    updateMoodButtons();

    updateFavoriteButton();


    if (diaryModal) {

        diaryModal.classList.remove(
            "hidden"
        );

    }

}


/* ==========================================
   DELETE
========================================== */

function deleteEntry(id) {

    const entry =
        diaryEntries.find(
            item => item.id === id
        );


    if (!entry) return;


    if (
        !confirm(
            `Delete "${entry.title}"? ♡`
        )
    ) {

        return;

    }


    diaryEntries =
        diaryEntries.filter(
            item => item.id !== id
        );


    saveDiary();

    renderDiary();

}


/* ==========================================
   TOGGLE FAVORITE
========================================== */

function toggleFavorite(id) {

    const entry =
        diaryEntries.find(
            item => item.id === id
        );


    if (!entry) return;


    entry.favorite =
        !entry.favorite;


    saveDiary();

    renderDiary();

}


/* ==========================================
   SEARCH
========================================== */

if (diarySearch) {

    diarySearch.addEventListener(
        "input",
        renderDiary
    );

}


/* ==========================================
   FAVORITES
========================================== */

if (favoritesFilter) {

    favoritesFilter.addEventListener(
        "click",
        () => {

            favoritesOnly =
                !favoritesOnly;

            favoritesFilter.classList.toggle(
                "active",
                favoritesOnly
            );

            renderDiary();

        }
    );

}


/* ==========================================
   DATE HELPERS
========================================== */

function getTodayDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


function formatDate(dateString) {

    if (!dateString)
        return "";


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}


/* ==========================================
   HTML SAFETY
========================================== */

function escapeHTML(text) {

    return String(text)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* ==========================================
   INITIALIZE
========================================== */

renderDiary();


/* ==========================================
   SETTINGS
========================================== */

const settingsButton =
    document.getElementById(
        "settingsButton"
    );


if (settingsButton) {

    settingsButton.addEventListener(
        "click",
        () => {

            alert(
                "Our customization room is coming soon! ✦"
            );

        }
    );

}
