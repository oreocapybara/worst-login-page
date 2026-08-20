import successSoundUrl from '../assets/sound/success.mp3';
import blobSoundUrl from '../assets/sound/blob.ogg';
import { stopBgm } from './main.js';
import { state } from './state.js';

export function showHomeView() {
	// Stop the background music
	stopBgm();

	// Reset game state so lingering event listeners no-op
	state.phase = 'done';
	// Replace body content with congratulations markup
	document.body.innerHTML = `
		<h1>Congratulations!</h1>
		<p>You are logged in! That was terrible, wasn't it?</p>
		<a href="#" id="sign-out">Sign Out</a>
	`;

	// Apply home page body styles
	document.body.className = 'home-view';

	// Play success sound
	const successSound = new Audio(successSoundUrl);
	successSound.play();

	// Create confetti
	const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
	for (let i = 0; i < 30; i++) {
		const confetti = document.createElement('div');
		confetti.className = 'confetti';
		confetti.style.left = Math.random() * 100 + 'vw';
		confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
		confetti.style.animationDelay = Math.random() * 3 + 's';
		confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
		document.body.appendChild(confetti);
	}

	// Sign out — reload to reset the game
	const blobSound = new Audio(blobSoundUrl);
	document.getElementById('sign-out').addEventListener('click', (e) => {
		e.preventDefault();
		blobSound.currentTime = 0;
		blobSound.play();
		setTimeout(() => { location.reload(); }, 200);
	});
}
