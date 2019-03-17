import React from 'react';

export const ListItem = props => {
	return <div className='list-item'>{props.children}</div>;
};

export default props => {
	return <div className='list'>{props.children}</div>;
};
