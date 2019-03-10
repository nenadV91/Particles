// Globals
let canvas;
let width;
let height;

const particles = [];
const pTotal = 20;

const food = [];
const poison = [];
const fInterval = 100;
const pInterval = 200;

const colors = {
	particle: '#ffffff',
	background: '#041624',
	food: '#2c5380',
	poison: '#DD0E06'
};

function setup() {
	width = windowWidth;
	height = windowHeight;
	canvas = createCanvas(width, height);

	Particle.createAll(particles, pTotal);

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
