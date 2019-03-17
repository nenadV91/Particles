import React, { Component } from 'react';
import classnames from 'classnames';

export default class Button extends Component {
	state = {
		active: false
	};

	handleClick = () => {
		this.props.handleClick();
		this.setState(({ active }) => ({ active: !active }));
	};

	render() {
		const Icon = this.props.icon;
		const className = classnames({
			btn: true,
			'btn-control': true,
			active: this.state.active
		});

		return (
			<button onClick={this.handleClick} className={className}>
				{this.props.children}
			</button>
		);
	}
}
