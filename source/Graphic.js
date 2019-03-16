class Graphic {
	static particle(particle, alpha, angle) {
		const { position, radius } = particle;
		const col = particle.color;

		if (display.particleForces) {
			Graphic.particleForce(particle, 'good', color(0, 255, 0));
			Graphic.particleForce(particle, 'bad', color(255, 0, 0));
		}

		push();
		translate(position.x, position.y - 25);

		if (display.particleStats) {
			Graphic.particleStats(particle);
		}

		translate(0, 25);
		rotate(angle);

		col.setAlpha(alpha);
		noStroke();
		fill(col);
		strokeWeight(1);
		beginShape();
		vertex(0, -radius * 1.5);
		vertex(-radius, radius * 1.5);
		vertex(radius, radius * 1.5);
		endShape(CLOSE);
		pop();
	}

	static particleForce(particle, force, color) {
		const {
			position: { x, y },
			ui: { forces }
		} = particle;

		noFill();
		color.setAlpha(100);
		stroke(color);
		ellipse(x, y, forces[force], forces[force]);
	}

	static particleStats(particle) {
		const stats = [];
		const textColor = color(255, 255, 255, 100);
		const health = particle.health.toFixed(0);
		const maxHealth = particle.dna.maxHealth.toFixed(0);
		const healthLoss = particle.healthLoss.toFixed(2);

		let xbase = display.particleForces ? 50 : 30;
		let ybase = 12;

		const addStat = (label, value) => {
			const stat = { label, value };
			stat.show = i => {
				noStroke();
				fill(textColor);
				textSize(10);
				text(`${label}: ${value}`, xbase, ybase * i);
			};

			stat.type = 'text';
			stats.push(stat);
		};

		const addLine = (value, maxValue, lineColor) => {
			const min = 0;
			const max = 75;
			const bg = color(255, 255, 255, 100);
			const len = map(value, 0, maxValue, min, max);
			const stat = { value, len };

			stat.show = i => {
				const y = ybase * i - ybase / 2;

				// bg line
				noFill();
				stroke(bg);
				line(xbase, y, xbase + max, y);

				// main line
				stroke(lineColor);
				line(xbase, y, xbase + len, y);
			};

			stat.type = 'line';
			stats.push(stat);
		};

		addStat('Id', particle.id);
		addStat('Age', particle.age);
		addStat('Generation', particle.generation);
		addStat('Health loss', healthLoss);
		addStat('Health', `${health}  /  ${maxHealth}`);
		addLine(health, maxHealth, color(0, 255, 0, 200));

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
