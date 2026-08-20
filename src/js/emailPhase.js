import { state } from './state.js';
import { animateInput } from './animation.js';
import { handleGrab, registerPhaseStarter } from './grab.js';

export function startEmailPhase() {
	state.phase = "email";
	state.speed = 15;
	state.inputX = -270;

	const email = document.createElement("input");
	email.type = "text";
	email.placeholder = "Enter Oreo's Email";
	email.className = "moving-input";
	email.id = "moving-email";
	email.readOnly = true;
	email.required = true;
	email.pattern = "[a-zA-Z0-9._%+\\-]+@web\\.dev\\.com";

	const gamezone = document.querySelector("#gamezone");
	const capyRect = document.querySelector("#capybara-body").getBoundingClientRect();
	const rightRect = document.querySelector("#right-container").getBoundingClientRect();

	const verticalPos = capyRect.top - rightRect.top + (capyRect.height / 2) - 20;

	email.style.top = verticalPos + "px";
	email.style.left = "-270px";

	gamezone.append(email);

	email.addEventListener("click", (e) => {
		e.preventDefault();
		handleGrab(email);
	});

	animateInput(email);
}

registerPhaseStarter('email', startEmailPhase);
