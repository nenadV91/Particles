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
		const x = random(width);
		const y = random(height);
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

class Food extends Resource {
	constructor(...props) {
		super(...props);
		this.value = 10;
		this.color = colors.food;
		this.type = 'food';
		this.force = 'good';
	}
}

class Poison extends Resource {
	constructor(...props) {
		super(...props);
		this.value = -25;
		this.color = colors.poison;
		this.type = 'poison';
		this.force = 'bad';
	}
}
