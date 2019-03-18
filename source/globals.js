export const colors = {
	particle: 'rgb(255, 255, 255)',
	background: 'rgb(1, 0, 2)',
	food: 'rgba(68, 255, 255, 0.8)',
	poison: 'rgba(173, 68, 51, 0.9)',
	stats: 'rgba(255, 255, 255, 0.4)',
	area: 'rgba(64, 41, 133, 0.1)'
};

export const rates = {
	force: 0.35,
	maxForce: 0.025,
	maxSpeed: 0.1,
	aging: 0.1
};

export const limits = {
	force: 3,
	maxForce: 0.6,
	maxSpeed: 3,
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

export const camera = {
	view: { x: 0, y: 0, zoom: 1 },
	viewPos: { prevX: null, prevY: null, isDragging: false }
};
