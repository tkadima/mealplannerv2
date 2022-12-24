import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';


type PropTypes = { 
    onClickCancel: () => void;
    onClickSubmit: () => void; 
}

const FoodButtonGroup = ({onClickCancel, onClickSubmit}: PropTypes) => {
	const handleCancel = () => { 
		onClickCancel();
	};

	const handleSubmit = () => {
		onClickSubmit();
	};
	return (
		<ButtonGroup style={{ float: 'right' }}>
			<Button variant='secondary' onClick={handleCancel}>Cancel</Button>
			<Button onClick={handleSubmit}>Submit</Button>
		</ButtonGroup>
	);
};

export default FoodButtonGroup;