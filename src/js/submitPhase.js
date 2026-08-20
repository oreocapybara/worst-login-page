import { state } from './state.js';
import { registerPhaseStarter } from './grab.js';
import { showHomeView } from './homeView.js';
import blobSoundUrl from '../assets/sound/blob.ogg';
import failSoundUrl from '../assets/sound/error.wav';

const blobSound = new Audio(blobSoundUrl);
const failSound = new Audio(failSoundUrl);

export function startSubmitPhase() {
	state.phase = "submit";

	const btn = document.getElementById("submit");
	btn.classList.remove("hidden");
	btn.disabled = true;

	const emailInput = document.getElementById("moving-email");
	const passwordInput = document.getElementById("moving-password");

	function checkInputs() {
		btn.disabled = emailInput.value.trim() === "" || passwordInput.value.trim() === "";
	}

	emailInput.addEventListener("input", checkInputs);
	passwordInput.addEventListener("input", checkInputs);

	let submitAnimId = null;
	let x = window.innerWidth / 2;
	let y = window.innerHeight / 2;
	let vx = 8;
	let vy = 6;
	let lastDirectionChange = Date.now();
	let nextChangeInterval = randomBetween(200, 500);

	function randomBetween(min, max) {
		return Math.random() * (max - min) + min;
	}

	function submitLoop() {
		const now = Date.now();

		if (now - lastDirectionChange > nextChangeInterval) {
			vx = randomBetween(-12, 12);
			vy = randomBetween(-12, 12);
			if (Math.abs(vx) < 4) vx = vx < 0 ? -4 : 4;
			if (Math.abs(vy) < 4) vy = vy < 0 ? -4 : 4;
			lastDirectionChange = now;
			nextChangeInterval = randomBetween(200, 500);
		}

		x += vx;
		y += vy;

		const btnWidth = btn.offsetWidth;
		const btnHeight = btn.offsetHeight;

		if (x <= 0) { x = 0; vx = Math.abs(vx); }
		if (x >= window.innerWidth - btnWidth) { x = window.innerWidth - btnWidth; vx = -Math.abs(vx); }
		if (y <= 0) { y = 0; vy = Math.abs(vy); }
		if (y >= window.innerHeight - btnHeight) { y = window.innerHeight - btnHeight; vy = -Math.abs(vy); }

		btn.style.left = `${x}px`;
		btn.style.top = `${y}px`;

		submitAnimId = requestAnimationFrame(submitLoop);
	}

	submitAnimId = requestAnimationFrame(submitLoop);

	btn.addEventListener("click", () => {
		const email = document.getElementById("moving-email").value.trim();
		const password = document.getElementById("moving-password").value.trim();
		if (email === "sparcsbounty@web.dev.com" && password === "!oreoxsparcs") {
			cancelAnimationFrame(submitAnimId);
			blobSound.currentTime = 0;
			blobSound.play();
			setTimeout(() => { showHomeView(); }, 200);
		} else {
			failSound.currentTime = 0;
			failSound.play();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (state.phase !== "submit") return;
		if (btn.disabled) return;
		if (e.key === " " && document.activeElement === btn) {
			e.preventDefault();
			const email = document.getElementById("moving-email").value.trim();
			const password = document.getElementById("moving-password").value.trim();
			if (email === "sparcsbounty@web.dev.com" && password === "!oreoxsparcs") {
				cancelAnimationFrame(submitAnimId);
				blobSound.currentTime = 0;
				blobSound.play();
				setTimeout(() => { showHomeView(); }, 200);
			} else {
				failSound.currentTime = 0;
				failSound.play();
			}
		}
	});

	// Play fail sound when clicking anywhere that's not the submit button or inputs
	document.addEventListener("click", (e) => {
		if (state.phase !== "submit") return;
		if (e.target === btn) return;
		if (e.target.tagName === "INPUT") return;

		failSound.currentTime = 0;
		failSound.play();

		// Show oops text
		const oopsText = document.getElementById("oops-text");
		if (!oopsText) return;
		oopsText.classList.remove("hidden");
		oopsText.style.animation = "none";
		oopsText.offsetHeight; // Force reflow
		oopsText.style.animation = "";
	});
}

registerPhaseStarter('submit', startSubmitPhase);
