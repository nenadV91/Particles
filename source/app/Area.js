import { Food, Poison } from 'app/Resource';

class Area {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = p5.color(color);

		this.food = [];
		this.poison = [];

		this.startX = this.x - this.radius / 2;
		this.startY = this.y - this.radius / 2;
		this.endX = this.x + this.radius / 2;
		this.endY = this.y + this.radius / 2;
	}

	createResource(resource) {
		const angle = p5.random(p5.TWO_PI);
		const x = Math.cos(angle) * p5.random(this.radius / 2) + this.x;
		const y = Math.sin(angle) * p5.random(this.radius / 2) + this.y;

		return new resource(x, y);
	}

	createFood(limit) {
		for (let i = 0; i < limit; i++) {
			const resource = this.createResource(Food);
			this.food.push(resource);
		}
	}

	createPoison(limit) {
		for (let i = 0; i < limit; i++) {
			const resource = this.createResource(Poison);
			this.poison.push(resource);
		}
	}

	maintain(list, total, resource, interval) {
		window[`${resource.name}Interval`] = setInterval(() => {
			if (list.length < total) list.push(this.createResource(resource));
		}, interval);
	}

	maintainFood(limit, interval) {
		this.maintain(this.food, limit, Food, interval);
	}

	maintainPoison(limit, interval) {
		this.maintain(this.poison, limit, Poison, interval);
	}

	show() {
		p5.noStroke();
		p5.fill(this.color);
		p5.ellipse(this.x, this.y, this.radius, this.radius);
	}

	showFood() {
		this.food.forEach(item => item.show());
	}

	showPoison() {
		this.poison.forEach(item => item.show());
	}
}

export default Area;
