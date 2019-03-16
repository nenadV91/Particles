class Graphic {
	static particle(particle, alpha, angle) {
		const { position, radius } = particle;
		const col = particle.color;

		if (globals.display.particleForces) {
			Graphic.particleForce(particle, 'good', p5.color(0, 255, 0));
			Graphic.particleForce(particle, 'bad', p5.color(255, 0, 0));
		}

		p5.push();
		p5.translate(position.x, position.y - 25);

		if (globals.display.particleStats) {
			Graphic.particleStats(particle);
		}

		p5.translate(0, 25);
		p5.rotate(angle);

		col.setAlpha(alpha);
		p5.noStroke();
		p5.fill(col);
		p5.strokeWeight(1);
		p5.beginShape();
		p5.vertex(0, -radius * 1.5);
		p5.vertex(-radius, radius * 1.5);
		p5.vertex(radius, radius * 1.5);
		p5.endShape(p5.CLOSE);
		p5.pop();
	}

	static particleForce(particle, force, color) {
		const {
			position: { x, y },
			ui: { forces }
		} = particle;

		p5.noFill();
		color.setAlpha(100);
		p5.stroke(color);
		p5.ellipse(x, y, forces[force], forces[force]);
	}

	static particleStats(particle) {
		const stats = [];
		const textColor = p5.color(255, 255, 255, 100);
		const health = particle.health.toFixed(0);
		const maxHealth = particle.dna.maxHealth.toFixed(0);
		const healthLoss = particle.healthLoss.toFixed(2);

		let xbase = globals.display.particleForces ? 50 : 30;
		let ybase = 12;

		const addStat = (label, value) => {
			const stat = { label, value };
			stat.show = i => {
				p5.noStroke();
				p5.fill(textColor);
				p5.textSize(10);
				p5.text(`${label}: ${value}`, xbase, ybase * i);
			};

			stat.type = 'text';
			stats.push(stat);
		};

		const addLine = (value, maxValue, lineColor) => {
			const min = 0;
			const max = 75;
			const bg = p5.color(255, 255, 255, 100);
			const len = p5.map(value, 0, maxValue, min, max);
			const stat = { value, len };

			stat.show = i => {
				const y = ybase * i - ybase / 2;

				// bg line
				p5.noFill();
				p5.stroke(bg);
				p5.line(xbase, y, xbase + max, y);

				// main line
				p5.stroke(lineColor);
				p5.line(xbase, y, xbase + len, y);
			};

			stat.type = 'line';
			stats.push(stat);
		};

		addStat('Id', particle.id);
		addStat('Age', particle.age);
		addStat('Generation', particle.generation);
		addStat('Health loss', healthLoss);
		addStat('Health', `${health}  /  ${maxHealth}`);
		addLine(health, maxHealth, p5.color(0, 255, 0, 200));

		for (let i = 0; i < stats.length; i++) {
			const stat = stats[i];
			stat.show(i);
		}
	}

	static resource(position, radius, color) {
		p5.noStroke();
		p5.fill(color);
		p5.ellipse(position.x, position.y, radius, radius);
	}
}

export default Graphic;
