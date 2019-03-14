class DNA {
	constructor() {
		this.maxSpeed = random(0.5, 2);
		this.maxForce = random(0.1, 0.6);
		this.maxHealth = random(100, 300);

		this.forces = {
			good: random(-2, 2),
			bad: random(-2, 2)
		};
	}

	mutateForce() {
		const rate = rates.force;
		this.forces.good += random(-rate, rate);
		this.forces.bad += random(-rate, rate);

		for (let force in this.forces) {
			if (this.forces[force] > limits.force) {
				this.forces[force] = limits.force;
			}
		}
	}

	mutateStats() {
		const msRate = rates.maxSpeed;
		const mfRate = rates.maxForce;
		const stats = ['maxSpeed', 'maxForce'];
		this.maxSpeed += random(-msRate, msRate);
		this.maxForce += random(-mfRate, mfRate);

		stats.forEach(stat => {
			if (this[stat] > limits[stat]) {
				this[stat] = limits[stat];
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
