export const colors = {
	particle: 'rgb(255, 255, 255)',
	background: 'rgba(0, 0, 0, 1)',
	food: 'rgba(49, 40, 228, 0.8)',
	poison: 'rgba(197, 45, 40, 0.6)'
};

export const rates = {
	force: 0.35,
	maxForce: 0.025,
	maxSpeed: 0.1,
	aging: 0.1
};

export const limits = {
	force: 3,
	maxForce: 0.8,
	maxSpeed: 2.5,
	particles: {
		initial: 30,
		total: 50
	}
};

export const counter = {
	particle: 0,
	time: 0
};

export const display = {
	particleStats: false,
	particleForces: false
};

export const intervals = {
	resource: 50,
	particle: 200
};

export const options = {
	clone: {
		points: 30,
		interval: 500
	}
};
