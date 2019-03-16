class Particle {
	constructor(x, y, dna, parents = '') {
		this.id = counter.particle;
		this.parents = parents + (parents ? '-' : '') + this.id;

		this.position = new p5.Vector(x, y);
		this.velocity = new p5.Vector(0, 0);
		this.acceleration = new p5.Vector(0, 0);

		this.color = color(colors.particle);
		this.radius = 4;
		this.age = 0;
		this.generation = 0;
		this.health = 100;
		this.healthLoss = 0.1;
		this.points = 0;

		if (dna) this.dna = dna;
		else this.dna = new DNA();

		counter.particle += 1;

		const { forces } = this.dna;
		const good = map(forces.good, 0, limits.force, 5, 150);
		const bad = map(forces.bad, 0, limits.force, 5, 150);

		this.ui = {
			forces: { good, bad }
		};
	}

	show() {
		this.showBody();
	}

	showBody() {
		const angle = this.velocity.heading() + PI / 2;
		const alpha = map(this.health, 0, this.dna.maxHealth, 20, 255);
		Graphic.particle(this, alpha, angle);
	}

	move() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.dna.maxSpeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	moveTo(target) {
		if (!target) {
			return false;
		}

		this.direction = p5.Vector.sub(target.position, this.position);
		this.direction.setMag(this.dna.maxSpeed);
		this.force = p5.Vector.sub(this.direction, this.velocity);
		this.force.limit(this.dna.maxForce);

		this.applyForce(this.force, target);
		this.accelerate(this.force);
		this.move();
	}

	accelerate(force) {
		this.acceleration.add(force);
	}

	applyForce(force, target) {
		force.mult(this.dna.forces[target.force]);
	}

	aging() {
		if (this.age % 1000 == 0) {
			this.healthLoss += rates.aging;
		}
	}

	reproduction(list) {
		if (list.length < pTotal) {
			const checkAge = this.age % cloneInterval == 0;
			const checkPoints = this.points >= clonePoints;

			if (checkAge && checkPoints) {
				list.push(this.clone());
				this.points = 0;
			}
		}
	}

	death(list, index) {
		if (this.health < 1) {
			list.splice(index, 1);
		}
	}

	update(list, index) {
		this.health -= this.healthLoss;
		this.age += 1;

		this.aging();
		this.reproduction(list);
		this.death(list, index);
	}

	clone() {
		const {
			position: { x, y },
			parents,
			generation
		} = this;
		const dna = this.dna.clone();
		const clone = new Particle(x, y, dna, parents);
		clone.generation = generation + 1;
		return clone;
	}

	seek(list) {
		const selected = this.select(list);

		if (!selected) {
			return this.move();
		} else {
			const { target, distance, index } = selected;
			this.target = target;
			this.moveTo(this.target);
			this.eat(list, this.target, distance, index);
		}
	}

	select(list) {
		let target, index, distance;

		for (let i = 0; i < list.length; i++) {
			const resource = list[i];
			const dist = resource.position.dist(this.position);

			if (!target || distance > dist) {
				target = resource;
				distance = dist;
				index = i;
			}
		}

		if (!target) {
			return null;
		}

		return {
			target,
			distance,
			index
		};
	}

	eat(list, target, distance, index) {
		if (distance < 5) {
			const newHealth = this.health + target.value;
			if (newHealth <= this.dna.maxHealth) {
				this.health = newHealth;
			}

			this.points += 1;
			list.splice(index, 1);
		}
	}

	static create() {
		const x = random(width);
		const y = random(height);
		return new Particle(x, y);
	}

	static createAll(list, total) {
		for (let i = 0; i < total; i++) {
			list.push(Particle.create());
		}
	}
}
