import React from 'react';
import GeneralStats from './widgets/GeneralStats';
import Widget, { WidgetHeader, WidgetBody } from 'components/Widget';
import Button from 'components/Button';
import EyeIcon from 'icons/eye';
import ForceIcon from 'icons/force';
import StatsIcon from 'icons/bars';

class App extends React.Component {
	state = {
		statsWidget: true
	};

	toggleStats = () => {
		const { display } = this.props.globals;
		display.particleStats = !display.particleStats;
	};

	toggleForces = () => {
		const { display } = this.props.globals;
		display.particleForces = !display.particleForces;
	};

	toggleStatsWidget = () => {
		this.setState(({ statsWidget }) => ({ statsWidget: !statsWidget }));
	};

	render = () => {
		const { globals, particles } = this.props;
		const { statsWidget } = this.state;

		return (
			<div className='app-content'>
				<Widget defaultPosition={{ x: 25, y: 30 }}>
					<WidgetHeader>Controls</WidgetHeader>
					<WidgetBody>
						<Button handleClick={this.toggleStats}>
							<EyeIcon />
						</Button>

						<Button handleClick={this.toggleForces}>
							<ForceIcon />
						</Button>

						<Button active={statsWidget} handleClick={this.toggleStatsWidget}>
							<StatsIcon />
						</Button>
					</WidgetBody>
				</Widget>

				<Widget visible={statsWidget} defaultPosition={{ x: 25, y: 30 }}>
					<WidgetHeader>General stats</WidgetHeader>
					<WidgetBody>
						<GeneralStats particles={particles} globals={globals} />
					</WidgetBody>
				</Widget>
			</div>
		);
	};
}

export default App;
