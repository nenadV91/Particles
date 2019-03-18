import React, { Component, Fragment } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import List, { ListItem } from 'components/List';
import HiddenHead from './HiddenHead';
import EyeIcon from 'icons/eye';

export default ({ particles, globals }) => {
	const handleClick = particle => {
		particle.showStats = !particle.showStats;
	};

	return (
		<Fragment>
			<List>
				<ListItem>
					<span>Time: </span>
					<span>{globals.counter.time}</span>
				</ListItem>

				<ListItem>
					<span>Zoom: </span>
					<span>{globals.camera.view.zoom.toFixed(2)}</span>
				</ListItem>

				<ListItem>
					<span>Particles total: </span>
					<span>{globals.counter.particle}</span>
				</ListItem>

				<ListItem>
					<span>Particles alive: </span>
					<span>{particles.length}</span>
				</ListItem>
			</List>

			<div className='separator' />

			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Gen</th>
						<th>Speed</th>
						<th>Points</th>
						<th>Hp</th>
						<th>Hp loss</th>
						<th>Stats</th>
					</tr>
				</thead>
			</table>

			<Scrollbars style={{ width: '100%', height: 250 }}>
				<table cellSpacing='0' cellPadding='0' className='widget-table'>
					<HiddenHead />

					<tbody>
						{particles.map((particle, index) => {
							return (
								<tr onClick={() => handleClick(particle)} key={particle.id}>
									<td>{particle.id}</td>
									<td>{particle.generation}</td>
									<td>{particle.dna.maxSpeed.toFixed(1)}</td>
									<td>{particle.points}</td>
									<td>{particle.health.toFixed(0)}</td>
									<td>{particle.healthLoss.toFixed(2)}</td>
									<td>
										{particle.showStats ? (
											<span>
												<EyeIcon />
											</span>
										) : (
											<span>-</span>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</Scrollbars>
		</Fragment>
	);
};
