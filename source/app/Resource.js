import Graphic from 'app/Graphic';

class Resource {
	constructor(x, y, { value, type, color, force } = {}) {
		this.position = new p5.Vector(x, y);
		this.radius = 5;
		this.value = value;
		this.type = type;
		this.color = color;
		this.force = force;
	}

	show() {
		Graphic.resource(this.position, this.radius, this.color);
	}

	static create(resource) {
		const x = p5.random(width);
		const y = p5.random(height);
		return new resource(x, y);
	}

	static createAll(list, count, resource) {
		for (let i = 0; i < count; i++) {
			list.push(Resource.create(resource));
		}
	}

	static maintain(list, total, resource, interval) {
		window[`${resource.name}Interval`] = setInterval(() => {
			if (list.length < total) list.push(Resource.create(resource));
		}, interval);
	}

	static show(list) {
		list.forEach(item => item.show());
	}
}

export class Food extends Resource {
	constructor(...props) {
		super(...props);
		this.min = 5;
		this.max = 15;
		this.value = p5.floor(p5.random(this.min, this.max));
		this.radius = p5.map(this.value, this.min, this.max, 2, 6);
		this.color = globals.colors.food;
		this.type = 'food';
		this.force = 'good';
	}
}

export class Poison extends Resource {
	constructor(...props) {
		super(...props);
		this.min = -5;
		this.max = -25;
		this.value = p5.floor(p5.random(this.min, this.max));
		this.radius = p5.map(this.value, this.min, this.max, 2, 6);
		this.color = globals.colors.poison;
		this.type = 'poison';
		this.force = 'bad';
	}
}

export default Resource;
