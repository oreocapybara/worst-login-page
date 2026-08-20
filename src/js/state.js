export const state = {
	phase: 'overlay', // 'overlay' | 'email' | 'password' | 'submit'
	emailGrabbed: false,
	passwordGrabbed: false,
	animationId: null,
	inputX: 0,
	speed: 3,
	cooldown: false,
};
