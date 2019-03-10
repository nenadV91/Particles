class Graphic {
	static particle(position, radius, color, alpha, angle) {
		color.setAlpha(alpha);
		noStroke();
		fill(color);
		strokeWeight(1);

		push();
		translate(position.x, position.y);
		rotate(angle);
		beginShape();
		vertex(0, -radius * 1.5);
		vertex(-radius, radius * 1.5);
		vertex(radius, radius * 1.5);
		endShape(CLOSE);
		pop();
	}

	static resource(position, radius, color) {
		noStroke();
		fill(color);
		ellipse(position.x, position.y, radius, radius);
	}
}
