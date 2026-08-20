// Play success sound on load
const successSound = new Audio('./assets/sound/success.mp3');
successSound.play();

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

// Sign out sound
const blobSound = new Audio('./assets/sound/blob.ogg');
const signOutBtn = document.querySelector('a');
signOutBtn.addEventListener('click', (e) => {
	e.preventDefault();
	blobSound.currentTime = 0;
	blobSound.play();
	setTimeout(() => {
		window.location.href = 'index.html';
	}, 200);
});
