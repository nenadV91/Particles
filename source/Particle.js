class Particle {
	constructor(x, y) {
		this.position = new p5.Vector(x, y);
		this.velocity = new p5.Vector(0, 0);
		this.acceleration = new p5.Vector(0, 0);

		this.color = colors.particle;
		this.radius = 5;

		this.maxSpeed = 3;
		this.maxForce = 0.4;
	}

	show() {
		this.showBody();
	}

	showBody() {
		const { x, y } = this.position;
		const theta = this.velocity.heading() + PI / 2;

		noStroke();
		fill(this.color);
		strokeWeight(1);

		push();
		translate(x, y);
		rotate(theta);
		beginShape();
		vertex(0, -this.radius * 1.5);
		vertex(-this.radius, this.radius * 1.5);
		vertex(this.radius, this.radius * 1.5);
		endShape(CLOSE);
		pop();
	}

	move() {
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}

	moveTo(target) {
		if (!target) {
			return false;
		}

		this.direction = p5.Vector.sub(target, this.position);
		this.direction.setMag(this.maxSpeed);

		this.force = p5.Vector.sub(this.direction, this.velocity);
		this.force.limit(this.maxForce);

		this.applyForce(this.force);
		this.move();
	}

	applyForce(force) {
		this.acceleration.add(force);
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

	static showAll(list) {
		list.forEach(item => item.show());
	}
}
