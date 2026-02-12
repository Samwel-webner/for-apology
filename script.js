/* ===============================
   ELEMENT REFERENCES
================================= */

const openBtn = document.getElementById("openBtn");
const messageBox = document.getElementById("messageBox");
const typewriter = document.getElementById("typewriter");

const funBtn = document.getElementById("funBtn");
const danceArea = document.getElementById("danceArea");
const danceMessage = document.getElementById("danceMessage");
const confettiContainer = document.getElementById("confettiContainer");
const returnBtn = document.getElementById("returnBtn");
const dancer = document.querySelector(".dance-cartoon");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

/* ===============================
   MUSIC CONTROL (MOBILE SAFE)
================================= */

let musicPlaying = false;
let fadeInterval = null;

musicBtn.addEventListener("click", async () => {
  try {

    if (!musicPlaying) {

      // Mobile browsers require user interaction
      bgMusic.volume = 0;
      await bgMusic.play();

      // Soft fade-in
      fadeInterval = setInterval(() => {
        if (bgMusic.volume < 0.9) {
          bgMusic.volume += 0.05;
        } else {
          clearInterval(fadeInterval);
        }
      }, 120);

      musicBtn.innerText = "Pause Music 🔇";
      musicPlaying = true;

    } else {

      bgMusic.pause();
      clearInterval(fadeInterval);

      musicBtn.innerText = "Play Music 🎵";
      musicPlaying = false;
    }

  } catch (err) {
    console.log("Audio blocked by browser:", err);
  }
});

/* ===============================
   TYPEWRITER MESSAGE
================================= */

const messageText =
"I know I disappeared for a while. That wasn’t fair to you. I should have communicated better. So here I am… doing better. Also… apparently I dance better than I communicate 😂";

let typing = false;

openBtn.addEventListener("click", () => {

  if (typing) return; // prevent spam clicking

  messageBox.classList.remove("hidden");
  typewriter.innerHTML = "";
  typing = true;

  typeEffect(0);
});

function typeEffect(i) {
  if (i < messageText.length) {
    typewriter.innerHTML += messageText.charAt(i);
    setTimeout(() => typeEffect(i + 1), 40);
  } else {
    typing = false;
  }
}

/* ===============================
   SILLY DANCE MODE
================================= */

funBtn.addEventListener("click", () => {

  danceArea.classList.remove("hidden");
  danceMessage.classList.add("hidden");
  returnBtn.classList.remove("hidden");

  startConfetti();
  startDanceSequence();
});

/* ===============================
   CONFETTI EFFECT
================================= */

function startConfetti() {

  confettiContainer.innerHTML = ""; // reset old confetti

  for (let i = 0; i < 80; i++) {

    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDuration = (2 + Math.random() * 2) + "s";

    confettiContainer.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

function randomColor() {
  const colors = ["#ff4d6d", "#ffd60a", "#80ed99", "#00bbf9", "#c77dff"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* ===============================
   DANCE SEQUENCE
================================= */

function startDanceSequence() {

  if (!dancer) return;

  dancer.style.animationPlayState = "running";

  setTimeout(() => {
    dancer.style.animationPlayState = "paused";
    danceMessage.classList.remove("hidden");
  }, 5000);
}

/* ===============================
   RETURN BUTTON
================================= */

returnBtn.addEventListener("click", () => {

  danceArea.classList.add("hidden");
  messageBox.classList.add("hidden");

  typewriter.innerHTML = "";

  if (dancer) {
    dancer.style.animationPlayState = "paused";
  }

  confettiContainer.innerHTML = "";
  danceMessage.classList.add("hidden");
  returnBtn.classList.add("hidden");
});
