import { state } from './state.js';

export function animateInput(input) {
	const containerWidth = window.innerWidth;

	function loop() {
		if (state.cooldown) {
			state.animationId = requestAnimationFrame(loop);
			return;
		}

		state.inputX += state.speed;

		if (state.inputX > containerWidth) {
			state.inputX = -270;
		}

		input.style.left = state.inputX + "px";
		state.animationId = requestAnimationFrame(loop);
	}

	state.animationId = requestAnimationFrame(loop);
}
