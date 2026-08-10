/* ==========================================
   FLUFFY DAYS
========================================== */


/* ==========================================
   ELEMENTS
========================================== */

const nameInput =
    document.getElementById("nameInput");

const enterButton =
    document.getElementById("enterButton");

const welcomeScreen =
    document.getElementById("welcomeScreen");

const app =
    document.getElementById("app");

const userGreeting =
    document.getElementById("userGreeting");

const dateText =
    document.getElementById("dateText");

const themeButtons =
    document.querySelectorAll(".theme");

const navButtons =
    document.querySelectorAll(".nav-button");

const featureCards =
    document.querySelectorAll(".feature-card");


/* ==========================================
   THEME
========================================== */

let selectedTheme =
    localStorage.getItem("fluffyTheme") || "pink";

applyTheme(selectedTheme);


themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedTheme =
            button.dataset.theme;

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
        document.body.classList.add(
            "theme-blue"
        );
    }

    if (theme === "yellow") {
        document.body.classList.add(
            "theme-yellow"
        );
    }

    themeButtons.forEach(button => {

        button.classList.toggle(
            "selected",
            button.dataset.theme === theme
        );

    });

}


/* ==========================================
   NAME
========================================== */

const savedName =
    localStorage.getItem("fluffyName");

if (savedName) {

    nameInput.value =
        savedName;

}


/* ==========================================
   ENTER APP
========================================== */

enterButton.addEventListener(
    "click",
    enterApp
);


nameInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            enterApp();
        }

    }
);


function enterApp() {

    const name =
        nameInput.value.trim();

    if (!name) {

        nameInput.focus();

        nameInput.placeholder =
            "Tell me your name first... ♡";

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

    welcomeScreen.classList.add(
        "hidden"
    );

    app.classList.remove(
        "hidden"
    );

    showPage("home");

}


/* ==========================================
   DATE
========================================== */

function updateDate() {

    const today =
        new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    };

    const formatted =
        today.toLocaleDateString(
            "en-US",
            options
        );

    dateText.textContent =
        `Today is ${formatted} ✦`;

}


/* ==========================================
   LOAD USER
========================================== */

if (savedName) {

    userGreeting.textContent =
        `${savedName} ♡`;

    updateDate();

}


/* ==========================================
   NAVIGATION
========================================== */

navButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showPage(
                button.dataset.page
            );

        }
    );

});


featureCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

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
    document.getElementById(
        "diaryModal"
    );

const newEntryButton =
    document.getElementById(
        "newEntryButton"
    );

const emptyNewEntry =
    document.getElementById(
        "emptyNewEntry"
    );

const closeDiary =
    document.getElementById(
        "closeDiary"
    );

const saveEntry =
    document.getElementById(
        "saveEntry"
    );

const entryTitle =
    document.getElementById(
        "entryTitle"
    );

const entryDate =
    document.getElementById(
        "entryDate"
    );

const entryTags =
    document.getElementById(
        "entryTags"
    );

const entryContent =
    document.getElementById(
        "entryContent"
    );

const favoriteToggle =
    document.getElementById(
        "favoriteToggle"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const diaryEntriesContainer =
    document.getElementById(
        "diaryEntries"
    );

const emptyDiary =
    document.getElementById(
        "emptyDiary"
    );

const diarySearch =
    document.getElementById(
        "diarySearch"
    );

const favoritesFilter =
    document.getElementById(
        "favoritesFilter"
    );

const moodButtons =
    document.querySelectorAll(
        ".mood"
    );


/* ==========================================
   NEW ENTRY
========================================== */

newEntryButton.addEventListener(
    "click",
    openNewEntry
);

emptyNewEntry.addEventListener(
    "click",
    openNewEntry
);


function openNewEntry() {

    editingEntryId = null;

    selectedMood = "😊";

    selectedFavorite = false;

    modalTitle.textContent =
        "New Memory";

    entryTitle.value = "";

    entryContent.value = "";

    entryTags.value = "";

    entryDate.value =
        getTodayDate();

    updateMoodButtons();

    updateFavoriteButton();

    diaryModal.classList.remove(
        "hidden"
    );

    entryTitle.focus();

}


/* ==========================================
   CLOSE
========================================== */

closeDiary.addEventListener(
    "click",
    closeDiaryModal
);


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


function closeDiaryModal() {

    diaryModal.classList.add(
        "hidden"
    );

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
            button.dataset.mood ===
                selectedMood
        );

    });

}


/* ==========================================
   FAVORITE
========================================== */

favoriteToggle.addEventListener(
    "click",
    () => {

        selectedFavorite =
            !selectedFavorite;

        updateFavoriteButton();

    }
);


function updateFavoriteButton() {

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
   SAVE ENTRY
========================================== */

saveEntry.addEventListener(
    "click",
    saveDiaryEntry
);


function saveDiaryEntry() {

    const title =
        entryTitle.value.trim();

    const content =
        entryContent.value.trim();

    if (!title) {

        entryTitle.focus();

        entryTitle.placeholder =
            "Give your memory a title ♡";

        return;

    }

    if (!content) {

        entryContent.focus();

        entryContent.placeholder =
            "Write something for your diary... ♡";

        return;

    }


    const tags =
        entryTags.value
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);


    if (editingEntryId) {

        const index =
            diaryEntries.findIndex(
                entry =>
                    entry.id ===
                    editingEntryId
            );

        if (index !== -1) {

            diaryEntries[index] = {

                ...diaryEntries[index],

                title,
                content,
                mood: selectedMood,
                date: entryDate.value,
                tags,
                favorite: selectedFavorite

            };

        }

    } else {

        const newEntry = {

            id:
                Date.now(),

            title,

            content,

            mood:
                selectedMood,

            date:
                entryDate.value,

            tags,

            favorite:
                selectedFavorite,

            createdAt:
                new Date().toISOString()

        };

        diaryEntries.unshift(
            newEntry
        );

    }


    saveDiary();

    closeDiaryModal();

    renderDiary();

}


/* ==========================================
   SAVE TO LOCAL STORAGE
========================================== */

function saveDiary() {

    localStorage.setItem(
        "fluffyDiary",
        JSON.stringify(
            diaryEntries
        )
    );

}


/* ==========================================
   RENDER
========================================== */

function renderDiary() {

    const search =
        diarySearch.value
            .trim()
            .toLowerCase();


    let entries =
        [...diaryEntries];


    if (favoritesOnly) {

        entries =
            entries.filter(
                entry =>
                    entry.favorite
            );

    }


    if (search) {

        entries =
            entries.filter(
                entry => {

                    const text =
                        `${entry.title}
                        ${entry.content}
                        ${entry.tags.join(" ")}`

                    return text
                        .toLowerCase()
                        .includes(search);

                }
            );

    }


    diaryEntriesContainer.innerHTML = "";


    if (entries.length === 0) {

        diaryEntriesContainer.style.display =
            "none";

        emptyDiary.style.display =
            "block";

        return;

    }


    diaryEntriesContainer.style.display =
        "grid";

    emptyDiary.style.display =
        "none";


    entries.forEach(entry => {

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "entry-card";


        const tagsHTML =
            entry.tags
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
                    ${entry.mood}
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
            item =>
                item.id === id
        );

    if (!entry) return;


    editingEntryId =
        id;

    selectedMood =
        entry.mood;

    selectedFavorite =
        entry.favorite;

    modalTitle.textContent =
        "Edit Memory";


    entryTitle.value =
        entry.title;

    entryContent.value =
        entry.content;

    entryDate.value =
        entry.date;

    entryTags.value =
        entry.tags.join(", ");


    updateMoodButtons();

    updateFavoriteButton();


    diaryModal.classList.remove(
        "hidden"
    );

}


/* ==========================================
   DELETE
========================================== */

function deleteEntry(id) {

    const entry =
        diaryEntries.find(
            item =>
                item.id === id
        );

    if (!entry) return;


    const confirmed =
        confirm(
            `Delete "${entry.title}"? ♡`
        );


    if (!confirmed) return;


    diaryEntries =
        diaryEntries.filter(
            item =>
                item.id !== id
        );


    saveDiary();

    renderDiary();

}


/* ==========================================
   FAVORITE
========================================== */

function toggleFavorite(id) {

    const entry =
        diaryEntries.find(
            item =>
                item.id === id
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

diarySearch.addEventListener(
    "input",
    renderDiary
);


/* ==========================================
   FAVORITES FILTER
========================================== */

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
        ).padStart(2,"0");

    const day =
        String(
            today.getDate()
        ).padStart(2,"0");

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
   BASIC HTML SAFETY
========================================== */

function escapeHTML(text) {

    return String(text)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


/* ==========================================
   INITIAL DIARY LOAD
========================================== */

renderDiary();


/* ==========================================
   SETTINGS
========================================== */

const settingsButton =
    document.getElementById(
        "settingsButton"
    );

settingsButton.addEventListener(
    "click",
    () => {

        alert(
            "Settings will become our customization room later! ✦"
        );

    }
);
