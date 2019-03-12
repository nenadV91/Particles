class Graphic {
	static particle(particle, alpha, angle) {
		const { color, position, radius } = particle;

		push();
		translate(position.x, position.y);
		Graphic.particleStats(particle);

		color.setAlpha(alpha);
		noStroke();
		fill(color);
		strokeWeight(1);
		rotate(angle);
		beginShape();
		vertex(0, -radius * 1.5);
		vertex(-radius, radius * 1.5);
		vertex(radius, radius * 1.5);
		endShape(CLOSE);
		pop();
	}

	static particleStats(particle) {
		const stats = [];
		const textColor = color(255, 255, 255, 100);
		const health = particle.health.toFixed(0);
		const maxHealth = particle.dna.maxHealth.toFixed(0);
		const healthLoss = particle.healthLoss.toFixed(2);

		let x = 30;
		let y = 12;

		const addStat = (label, value) => {
			const stat = { label, value };
			stat.show = i => {
				fill(textColor);
				textSize(10);
				text(`${label}: ${value}`, x, y * i);
			};
			stats.push(stat);
		};

		const addGraph = label => {};

		addStat('Id', particle.id);
		addStat('Age', particle.age);
		addStat('Health', `${health}  /  ${maxHealth}`);
		addStat('Health loss', healthLoss);
		addStat('Generation', particle.generation);

		for (let i = 0; i < stats.length; i++) {
			const stat = stats[i];
			stat.show(i);
		}
	}

	static resource(position, radius, color) {
		noStroke();
		fill(color);
		ellipse(position.x, position.y, radius, radius);
	}
}
