import p5 from 'p5';
import * as globals from 'globals';
import Particle from 'app/Particle';
import Resource, { Food, Poison } from 'app/Resource';
import React from 'react';
import ReactDOM from 'react-dom';
import Widgets from './react';

// Globals
export const particles = [];
export const food = [];
export const poison = [];

const app = p5 => {
	p5.Vector = p5.constructor.Vector;
	global.width = p5.windowWidth;
	global.height = p5.windowHeight;
	global.globals = globals;
	global.p5 = p5;

	p5.setup = () => {
		global.canvas = p5.createCanvas(width, height);
		Particle.createAll(particles, globals.limits.particles.initial);
		Resource.createAll(food, 35, Food);
		Resource.createAll(poison, 15, Poison);
		Resource.maintain(food, 65, Food, globals.intervals.resource);
		Resource.maintain(poison, 25, Poison, globals.intervals.particle);

		class App extends React.Component {
			state = {
				particles: [],
				poison: [],
				food: []
			};

			componentDidMount = () => {
				this.setState({ particles });
				this.update = setInterval(() => this.setState({ particles }));
			};

			render = () => {
				return <Widgets globals={global.globals} particles={this.state.particles} />;
			};
		}

		// react
		ReactDOM.render(<App />, document.querySelector('#root'));
	};

	p5.draw = () => {
		globals.counter.time++;
		p5.background(globals.colors.background);

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
};

const P5 = new p5(app);
