class DNA {
	constructor() {
		this.maxSpeed = p5.random(1, 2);
		this.maxForce = p5.random(0.05, 0.4);
		this.maxHealth = p5.random(100, 300);

		this.forces = {
			good: p5.random(-2, 2),
			bad: p5.random(-2, 2)
		};
	}

	mutateForce() {
		const rate = globals.rates.force;
		this.forces.good += p5.random(-rate, rate);
		this.forces.bad += p5.random(-rate, rate);

		for (let force in this.forces) {
			if (this.forces[force] > globals.limits.force) {
				this.forces[force] = globals.limits.force;
			}
		}
	}

	mutateStats() {
		const msRate = globals.rates.maxSpeed;
		const mfRate = globals.rates.maxForce;
		const stats = ['maxSpeed', 'maxForce'];
		this.maxSpeed += p5.random(-msRate, msRate);
		this.maxForce += p5.random(-mfRate, mfRate);

		stats.forEach(stat => {
			if (this[stat] > globals.limits[stat]) {
				this[stat] = globals.limits[stat];
			}
		});
	}

	clone() {
		const clone = this.cloneObject(this);
		clone.forces = this.cloneObject(this.forces);
		clone.mutateForce();
		clone.mutateStats();
		return clone;
	}

	cloneObject(object) {
		const prototype = Object.create(Object.getPrototypeOf(object));
		return Object.assign(prototype, object);
	}
}

export default DNA;
