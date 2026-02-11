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

let musicPlaying = false;
musicBtn.addEventListener("click", () => {

  if (!musicPlaying) {
    bgMusic.volume = 0;
    bgMusic.play();

    // Soft fade-in
    let fade = setInterval(() => {
      if (bgMusic.volume < 0.9) {
        bgMusic.volume += 0.05;
      } else {
        clearInterval(fade);
      }
    }, 100);

    musicBtn.innerText = "Pause Music 🔇";
    musicPlaying = true;

  } else {

    bgMusic.pause();
    musicBtn.innerText = "Play Music 🎵";
    musicPlaying = false;
  }

});


/* ===============================
   TYPEWRITER MESSAGE
================================= */

const messageText = 
"I know I disappeared for a while. That wasn’t fair to you. I should have communicated better. So here I am… doing better. Also… apparently I dance better than I communicate 😂";

let index = 0;

openBtn.addEventListener("click", () => {
  messageBox.classList.remove("hidden");
  typewriter.innerHTML = "";
  index = 0;
  typeEffect();
});

function typeEffect() {
  if (index < messageText.length) {
    typewriter.innerHTML += messageText.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
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
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDuration = (2 + Math.random() * 2) + "s";

    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
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

  // Hide dance area
  danceArea.classList.add("hidden");

  // Clear message
  messageBox.classList.add("hidden");
  typewriter.innerHTML = "";

  // Stop dancer
  dancer.style.animationPlayState = "paused";

  // Remove confetti
  confettiContainer.innerHTML = "";

  // Hide return button
  returnBtn.classList.add("hidden");
});
