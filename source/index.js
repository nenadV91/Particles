import p5 from 'p5';
import * as globals from 'globals';
import Particle from 'app/Particle';
import Controls from 'app/Controls';
import Resource, { Food, Poison } from 'app/Resource';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './react';

// Globals
export const particles = [];
export const food = [];
export const poison = [];

const app = p5 => {
	p5.Vector = p5.constructor.Vector;
	global.width = p5.windowWidth;
	global.height = p5.windowHeight;
	global.food = food;
	global.poison = poison;
	global.particles = particles;
	global.globals = globals;
	global.camera = globals.camera;
	global.p5 = p5;

	p5.setup = () => {
		global.canvas = p5.createCanvas(width, height);
		canvas.mouseWheel(e => Controls.zoom(camera).worldZoom(e));

		Particle.createAll(particles, globals.limits.particles.initial);
		Resource.createAll(food, 35, Food);
		Resource.createAll(poison, 15, Poison);
		Resource.maintain(food, 65, Food, globals.intervals.resource);
		Resource.maintain(poison, 25, Poison, globals.intervals.particle);
	};

	p5.draw = () => {
		globals.counter.time++;
		p5.background(globals.colors.background);
		p5.translate(camera.view.x, camera.view.y);
		p5.scale(camera.view.zoom);

		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];
			particle.show();
			particle.seek(food);
			particle.seek(poison);
			particle.update(particles, i);
		}

		Resource.show(food);
		Resource.show(poison);
	};

	p5.mousePressed = e => Controls.move(camera).mousePressed(e);
	p5.mouseDragged = e => Controls.move(camera).mouseDragged(e);
	p5.mouseReleased = e => Controls.move(camera).mouseReleased(e);
};

ReactDOM.render(
	<App particles={particles} globals={globals} app={app} />,
	document.querySelector('#app')
);
