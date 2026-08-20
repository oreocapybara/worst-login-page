import { state } from './state.js';
import successSoundUrl from '../assets/sound/input2.mp3';
import failSoundUrl from '../assets/sound/error.wav';

// Registry to avoid circular imports
const phaseStarters = {};

// Sound effects
const successSound = new Audio(successSoundUrl);
const failSound = new Audio(failSoundUrl);

export function registerPhaseStarter(name, fn) {
	phaseStarters[name] = fn;
}

export function handleGrab(input) {
	if (state.cooldown) return;
	if (!input) return;
	if (!input.classList.contains("moving-input")) return;

	const capybara = document.getElementById("capybara");
	const capyRect = capybara.getBoundingClientRect();
	const inputRect = input.getBoundingClientRect();

	const capyCenterX = capyRect.left + capyRect.width / 2;
	const inputCenterX = inputRect.left + inputRect.width / 2;
	const distanceX = Math.abs(capyCenterX - inputCenterX);

	const GRAB_THRESHOLD = 100;

	if (distanceX <= GRAB_THRESHOLD) {
		grabSuccess(state.phase, input);
	} else {
		grabFail(state.phase, input);
	}
}

function grabSuccess(type, input) {
	cancelAnimationFrame(state.animationId);
	successSound.currentTime = 0;
	successSound.play();

	// Capybara wiggle
	const capyEl = document.getElementById("capybara");
	capyEl.classList.remove("capy-bouncing");
	capyEl.classList.add("capy-wiggle");
	setTimeout(() => {
		capyEl.classList.remove("capy-wiggle");
		capyEl.classList.add("capy-bouncing");
	}, 300);

	input.classList.remove("moving-input");
	input.classList.add("grabbed");
	input.readOnly = false;

	input.addEventListener("blur", () => {
		if (input.value && !input.validity.valid) {
			input.classList.add("invalid");
		} else {
			input.classList.remove("invalid");
		}
	});
	input.style.position = "relative";
	input.style.left = "auto";
	input.style.top = "auto";

	const grabContainer = document.querySelector("#grabbed-inputs");
	input.parentNode.removeChild(input);
	grabContainer.appendChild(input);

	if (type === "email") {
		state.emailGrabbed = true;
		document.getElementById("capybara-body").classList.add("capybara-active");
		setTimeout(() => phaseStarters.password(), 500);
	} else if (type === "password") {
		state.passwordGrabbed = true;

		setTimeout(() => phaseStarters.submit(), 500);
	}
}

function grabFail(type, input) {
	state.cooldown = true;
	cancelAnimationFrame(state.animationId);
	failSound.currentTime = 0;
	failSound.play();

	// Capybara shake
	const capyEl = document.getElementById("capybara");
	capyEl.classList.remove("capy-bouncing");
	capyEl.classList.add("capy-shake");
	setTimeout(() => {
		capyEl.classList.remove("capy-shake");
		capyEl.classList.add("capy-bouncing");
	}, 400);

	input.classList.add("falling");

	// Show oops text
	const oopsText = document.getElementById("oops-text");
	oopsText.classList.remove("hidden");
	oopsText.style.animation = "none";
	oopsText.offsetHeight; // Force reflow
	oopsText.style.animation = "";

	// After 1 seconds, respawn
	setTimeout(() => {
		oopsText.classList.add("hidden");
		input.remove();
		state.cooldown = false;
		state.inputX = -270;

		if (type === "email") {
			phaseStarters.email();
		} else {
			phaseStarters.password();
		}
	}, 1000);
}
