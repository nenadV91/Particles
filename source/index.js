// Globals
let canvas;
let width;
let height;

const particles = [];
const pInitial = 20;
const pTotal = 50;
const cloneInterval = 500;
const clonePoints = 35;

const food = [];
const poison = [];
const fInterval = 50;
const pInterval = 200;

const colors = {
	particle: 'rgba(255, 255, 255, 1)',
	background: 'rgba(0, 0, 0, 1)',
	food: 'rgb(108, 203, 221)',
	poison: 'rgb(238, 74, 91)'
};

const rates = {
	force: 0.35,
	maxForce: 0.025,
	maxSpeed: 0.1,
	aging: 0.1
};

const limits = {
	force: 3,
	maxForce: 0.8,
	maxSpeed: 3
};

const counter = {
	particle: 0
};

const display = {
	particleStats: true
};

function setup() {
	width = windowWidth;
	height = windowHeight;
	canvas = createCanvas(width, height);

	Particle.createAll(particles, pInitial);

	Resource.createAll(food, 35, Food);
	Resource.createAll(poison, 15, Poison);
	Resource.maintain(food, 65, Food, fInterval);
	Resource.maintain(poison, 25, Poison, pInterval);
}

function draw() {
	background(colors.background);

	for (let i = 0; i < particles.length; i++) {
		const particle = particles[i];
		particle.show();

		particle.seek(food);
		particle.seek(poison);
		particle.update(particles, i);
	}

	Resource.show(food);
	Resource.show(poison);
}

function parallax() {
	// var scene = document.getElementById('bg');
	// if (document.body.contains(scene)) {
	// 	var parallaxInstance = new Parallax(scene, {
	// 		frictionX: 0.15,
	// 		frictionY: 0.15
	// 	});
	// }
}
