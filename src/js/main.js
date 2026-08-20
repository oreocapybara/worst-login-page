import { state } from './state.js';
import { startEmailPhase } from './emailPhase.js';
// Import these to trigger their registerPhaseStarter calls
import './passwordPhase.js';
import './submitPhase.js';

import bgmUrl from '../assets/sound/bgm.mp3';
import blobUrl from '../assets/sound/blob.ogg';

// --- Capybara Entrance Animation ---
const capybaraEl = document.getElementById("capybara");
capybaraEl.classList.add("capy-hidden");

setTimeout(() => {
	capybaraEl.classList.remove("capy-hidden");
	capybaraEl.classList.add("capy-entrance");
}, 700);

capybaraEl.addEventListener("animationend", (e) => {
	if (e.animationName === "capy-entrance") {
		capybaraEl.classList.remove("capy-entrance");
	}
});

// --- BGM setup (autoplay with fallback) ---
const bgm = new Audio(bgmUrl);
bgm.loop = true;
let bgmStarted = false;

bgm.volume = 0.2;

export function stopBgm() {
	bgm.pause();
	bgm.currentTime = 0;
}

bgm.play().then(() => {
	bgmStarted = true;
}).catch(() => {
	// Autoplay blocked — will start on "Got it" click
});

// --- "Got it" button handler ---
const blobSound = new Audio(blobUrl);
const gotItBtn = document.querySelector("#left-container button");
gotItBtn.addEventListener("click", () => {
	blobSound.currentTime = 0;
	blobSound.play();
	if (!bgmStarted) {
		bgm.play();
		bgmStarted = true;
	}
	const leftContainer = document.querySelector("#left-container");
	leftContainer.style.opacity = "0.1";
	leftContainer.style.pointerEvents = "none";
	document.getElementById("capybara").classList.add("capy-bouncing");
	startEmailPhase();
});

// --- Resize Handler ---
window.addEventListener("resize", () => {
	const btn = document.getElementById("submit");
	if (btn && state.phase === "submit") {
		const x = parseFloat(btn.style.left);
		const y = parseFloat(btn.style.top);
		if (x > window.innerWidth - btn.offsetWidth) {
			btn.style.left = (window.innerWidth - btn.offsetWidth) + "px";
		}
		if (y > window.innerHeight - btn.offsetHeight) {
			btn.style.top = (window.innerHeight - btn.offsetHeight) + "px";
		}
	}
});
