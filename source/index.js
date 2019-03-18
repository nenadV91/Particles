import * as globals from 'globals';
import Particle from 'app/Particle';
import Controls from 'app/Controls';
import Area from 'app/Area';

import Resource, { Food, Poison } from 'app/Resource';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './react';

// Globals
export let particles = [];
export let canvas = null;
export let area = null;

const app = p5 => {
	p5.Vector = p5.constructor.Vector;
	global.width = p5.windowWidth;
	global.height = p5.windowHeight;
	global.particles = particles;
	global.area = area;
	global.globals = globals;
	global.camera = globals.camera;
	global.canvas = canvas;
	global.p5 = p5;

	p5.setup = () => {
		canvas = p5.createCanvas(width, height);
		canvas.mouseWheel(e => Controls.zoom(camera).worldZoom(e));

		area = new Area(width / 2, height / 2, width * 0.9, globals.colors.area);
		area.createFood(35);
		area.createPoison(15);
		area.maintainFood(65, globals.intervals.resource);
		area.maintainPoison(25, globals.intervals.resource);

		Particle.createAll(particles, globals.limits.particles.initial);
	};

	p5.draw = () => {
		globals.counter.time++;
		p5.background(globals.colors.background);
		p5.translate(camera.view.x, camera.view.y);
		p5.scale(camera.view.zoom);

		for (let i = 0; i < particles.length; i++) {
			const particle = particles[i];
			particle.show();
			particle.seek(area.food);
			particle.seek(area.poison);
			particle.update(particles, i);
		}

		area.show();
		area.showFood();
		area.showPoison();
	};

	p5.mousePressed = e => Controls.move(camera).mousePressed(e);
	p5.mouseDragged = e => Controls.move(camera).mouseDragged(e);
	p5.mouseReleased = e => Controls.move(camera).mouseReleased(e);
};

ReactDOM.render(
	<App particles={particles} globals={globals} app={app} />,
	document.querySelector('#app')
);
