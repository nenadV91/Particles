class DNA {
	constructor() {
		this.maxSpeed = random(0.5, 2.5);
		this.maxForce = random(0.1, 0.6);
		this.maxHealth = random(100, 300);

		this.forces = {
			good: random(-2, 2),
			bad: random(-2, 2)
		};
	}

	clone() {
		const prototype = Object.create(Object.getPrototypeOf(this));
		const clone = Object.assign(prototype, this);
		return clone;
	}
}
