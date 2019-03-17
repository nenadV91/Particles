import React from 'react';
import Draggable from 'react-draggable';

const Widget = props => {
	return (
		<Draggable
			defaultPosition={props.defaultPosition}
			bounds='.app-content'
			handle='.widget-header'>
			<div className='widget'>{props.children}</div>
		</Draggable>
	);
};

export const WidgetHeader = props => {
	return <div className='widget-header'>{props.children}</div>;
};

export const WidgetBody = props => {
	return <div className='widget-body'>{props.children}</div>;
};

export default Widget;
