import { state } from './state.js';
import { animateInput } from './animation.js';
import { handleGrab, registerPhaseStarter } from './grab.js';

export function startPasswordPhase() {
	state.phase = "password";
	state.speed = 17.5;
	state.inputX = -270;

	const password = document.createElement("input");
	password.type = "password";
	password.placeholder = "Enter Oreo's password";
	password.className = "moving-input";
	password.id = "moving-password";
	password.readOnly = true;
	password.required = true;
	password.pattern = "![a-z]+";

	const gamezone = document.querySelector("#gamezone");
	const capyRect = document.querySelector("#capybara-body").getBoundingClientRect();
	const rightRect = document.querySelector("#right-container").getBoundingClientRect();

	const verticalPos = capyRect.top - rightRect.top + (capyRect.height / 2) + 80;

	password.style.top = verticalPos + "px";
	password.style.left = "-270px";

	gamezone.append(password);

	password.addEventListener("click", (e) => {
		e.preventDefault();
		handleGrab(password);
	});

	animateInput(password);
}

registerPhaseStarter('password', startPasswordPhase);
