import React from 'react';
import GeneralStats from './widgets/GeneralStats';
import Widget, { WidgetHeader, WidgetBody } from 'components/Widget';
import EyeIcon from 'icons/eye';
import ForceIcon from 'icons/force';
import Button from 'components/Button';

export default props => {
	const { globals, particles } = props;
	const { display } = globals;

	const toggleStats = () => {
		display.particleStats = !display.particleStats;
	};

	const toggleForces = () => {
		display.particleForces = !display.particleForces;
	};

	return (
		<div className='app-content'>
			<Widget defaultPosition={{ x: 25, y: 30 }}>
				<WidgetHeader>Controls</WidgetHeader>
				<WidgetBody>
					<Button handleClick={toggleStats}>
						<EyeIcon />
					</Button>

					<Button handleClick={toggleForces}>
						<ForceIcon />
					</Button>
				</WidgetBody>
			</Widget>

			<Widget defaultPosition={{ x: 25, y: 30 }}>
				<WidgetHeader>General stats</WidgetHeader>
				<WidgetBody>
					<GeneralStats particles={particles} globals={globals} />
				</WidgetBody>
			</Widget>
		</div>
	);
};
