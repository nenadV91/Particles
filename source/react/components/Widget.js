import React from 'react';
import Draggable from 'react-draggable';

const Widget = ({ visible = true, defaultPosition, children }) => {
	if (!visible) {
		return null;
	}

	return (
		<Draggable defaultPosition={defaultPosition} bounds='.app-content' handle='.widget-header'>
			<div className='widget'>{children}</div>
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
