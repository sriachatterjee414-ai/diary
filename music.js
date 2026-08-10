/* =========================================
   FLUFFY DAYS — MUSIC
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const playButton =
    document.getElementById("playButton");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const shuffleButton =
    document.getElementById("shuffleButton");

const repeatButton =
    document.getElementById("repeatButton");

const favoriteButton =
    document.getElementById("favoriteButton");

const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const currentTime =
    document.getElementById("currentTime");

const totalTime =
    document.getElementById("totalTime");

const songTitle =
    document.getElementById("songTitle");

const artistName =
    document.getElementById("artistName");

const albumArt =
    document.getElementById("albumArt");

const visualizer =
    document.getElementById("visualizer");

const spotifyInput =
    document.getElementById("spotifyInput");

const spotifyButton =
    document.getElementById("spotifyButton");

const spotifyMessage =
    document.getElementById("spotifyMessage");

const moodText =
    document.getElementById("moodText");


/* =========================================
   SONGS
========================================= */

const songs = [

    {
        title: "Dreamy Afternoon",
        artist: "Fluffy Radio",
        duration: 204,
        emoji: "🌸"
    },

    {
        title: "Cloud Nine",
        artist: "Soft Sounds",
        duration: 187,
        emoji: "☁️"
    },

    {
        title: "Little Stars",
        artist: "Moonlight",
        duration: 221,
        emoji: "✨"
    }

];


let currentSong = 0;

let isPlaying = false;

let isFavorite = false;

let shuffle = false;

let repeat = false;

let currentSeconds = 0;

let timer = null;


/* =========================================
   LOAD SONG
========================================= */

function loadSong(index) {

    currentSong = index;

    const song =
        songs[currentSong];

    songTitle.textContent =
        song.title;

    artistName.textContent =
        song.artist;

    totalTime.textContent =
        formatTime(song.duration);

    currentSeconds = 0;

    progressBar.value = 0;

    albumArt
        .querySelector(".album-center")
        .innerHTML = `
            <span class="music-note">
                ${song.emoji}
            </span>
            <span>♡</span>
        `;

}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener(
    "click",
    togglePlay
);


function togglePlay() {

    isPlaying =
        !isPlaying;

    if (isPlaying) {

        playButton.textContent =
            "Ⅱ";

        albumArt.classList.add(
            "playing"
        );

        visualizer.classList.add(
            "playing"
        );

        startTimer();

    } else {

        playButton.textContent =
            "▶";

        albumArt.classList.remove(
            "playing"
        );

        visualizer.classList.remove(
            "playing"
        );

        stopTimer();

    }

}


/* =========================================
   TIMER SIMULATION
========================================= */

function startTimer() {

    stopTimer();

    timer =
        setInterval(
            () => {

                const song =
                    songs[currentSong];

                currentSeconds++;

                if (
                    currentSeconds >=
                    song.duration
                ) {

                    nextSong();

                    return;

                }

                updateProgress();

            },
            1000
        );

}


function stopTimer() {

    if (timer) {

        clearInterval(timer);

        timer = null;

    }

}


function updateProgress() {

    const song =
        songs[currentSong];

    progressBar.value =
        (currentSeconds /
            song.duration) * 100;

    currentTime.textContent =
        formatTime(
            currentSeconds
        );

}


function formatTime(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remaining =
        Math.floor(
            seconds % 60
        );

    return `${minutes}:${String(
        remaining
    ).padStart(2,"0")}`;

}


/* =========================================
   PROGRESS CLICK
========================================= */

progressBar.addEventListener(
    "input",
    () => {

        const song =
            songs[currentSong];

        currentSeconds =
            Math.floor(
                (
                    progressBar.value /
                    100
                ) * song.duration
            );

        updateProgress();

    }
);


/* =========================================
   NEXT
========================================= */

nextButton.addEventListener(
    "click",
    nextSong
);


function nextSong() {

    if (shuffle) {

        let next;

        do {

            next =
                Math.floor(
                    Math.random() *
                    songs.length
                );

        } while (
            next === currentSong &&
            songs.length > 1
        );

        loadSong(next);

    } else {

        let next =
            currentSong + 1;

        if (
            next >= songs.length
        ) {

            next = 0;

        }

        loadSong(next);

    }

    if (isPlaying) {

        startTimer();

    }

}


/* =========================================
   PREVIOUS
========================================= */

previousButton.addEventListener(
    "click",
    () => {

        if (currentSeconds > 5) {

            currentSeconds = 0;

            updateProgress();

            return;

        }

        let previous =
            currentSong - 1;

        if (previous < 0) {

            previous =
                songs.length - 1;

        }

        loadSong(previous);

    }
);


/* =========================================
   SHUFFLE
========================================= */

shuffleButton.addEventListener(
    "click",
    () => {

        shuffle =
            !shuffle;

        shuffleButton.classList.toggle(
            "active",
            shuffle
        );

    }
);


/* =========================================
   REPEAT
========================================= */

repeatButton.addEventListener(
    "click",
    () => {

        repeat =
            !repeat;

        repeatButton.classList.toggle(
            "active",
            repeat
        );

    }
);


/* =========================================
   FAVORITE
========================================= */

favoriteButton.addEventListener(
    "click",
    () => {

        isFavorite =
            !isFavorite;

        favoriteButton.classList.toggle(
            "loved",
            isFavorite
        );

        favoriteButton.textContent =
            isFavorite
                ? "♥"
                : "♡";

    }
);


/* =========================================
   VOLUME
========================================= */

volumeBar.addEventListener(
    "input",
    () => {

        const volume =
            Number(
                volumeBar.value
            );

        volumeBar.style.background =
            `linear-gradient(
                to right,
                var(--primary)
                ${volume}%,
                var(--secondary)
                ${volume}%
            )`;

    }
);


/* =========================================
   RECENT SONGS
========================================= */

const recentItems =
    document.querySelectorAll(
        ".recent-item"
    );


recentItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                const title =
                    item.dataset.title;

                const artist =
                    item.dataset.artist;

                const index =
                    songs.findIndex(
                        song =>
                            song.title ===
                            title
                    );

                if (index !== -1) {

                    loadSong(index);

                } else {

                    songTitle.textContent =
                        title;

                    artistName.textContent =
                        artist;

                }

                isPlaying = true;

                playButton.textContent =
                    "Ⅱ";

                albumArt.classList.add(
                    "playing"
                );

                visualizer.classList.add(
                    "playing"
                );

                startTimer();

            }
        );

    }
);


/* =========================================
   SPOTIFY LINK
========================================= */

spotifyButton.addEventListener(
    "click",
    openSpotify
);


function openSpotify() {

    const link =
        spotifyInput.value.trim();


    if (!link) {

        spotifyMessage.textContent =
            "Paste a Spotify link first ♡";

        return;

    }


    if (
        !link.includes(
            "open.spotify.com"
        )
    ) {

        spotifyMessage.textContent =
            "That doesn't look like a Spotify link ✦";

        return;

    }


    spotifyMessage.textContent =
        "Opening Spotify... ♡";


    window.open(
        link,
        "_blank"
    );

}


/* =========================================
   MOOD
========================================= */

const moodButtons =
    document.querySelectorAll(
        ".mood-buttons button"
    );


moodButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                moodText.textContent =
                    button.dataset.mood;

            }
        );

    }
);


/* =========================================
   START
========================================= */

loadSong(0);

volumeBar.dispatchEvent(
    new Event("input")
);
