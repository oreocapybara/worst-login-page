
function startEmailPhase() {
	const email = document.createElement("input");
	email.type = "text";
	email.placeholder = "oreodoescode@up.edu.ph";
	email.className = "moving-input";
	email.id = "moving-input";
	email.readOnly = true;

	const gamezone = document.querySelector("#gamezone");

	const capybara = document.querySelector("#capybara-body");
	const rightContainer = document.querySelector("#right-container");
	const capyRect = capybara.getBoundingClientRect();
	const rightRect = rightContainer.getBoundingClientRect();

	const verticalPos = capyRect.top - rightRect.top + (capyRect.height / 2) - 50;

	email.style.top = verticalPos + "px";
	email.style.left = "-270px"; // initial position

	//Append to gamezone
	gamezone.append(email);

	email.addEventListener("click", () => {
		console.log(`Email position at ${verticalPos}`)
	})
	animateInput(email);
}

function animateInput(input) {
	let inputX = -270;
	let speed = 15;

	const container = document.querySelector("#right-container");
	const containerWidth = window.innerWidth;
	function loop() {
		inputX += speed;

		if (inputX > containerWidth) {
			inputX = -270;
		}

		input.style.left = inputX + "px";
		requestAnimationFrame(loop);
	}
	requestAnimationFrame(loop)
}

startEmailPhase()
