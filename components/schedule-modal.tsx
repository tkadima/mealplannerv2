/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';

type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    day: string, 
    meal: string
}

const ScheduleModal = ({ show, onCloseModal, day, meal} : PropTypes) => {

	const recipeList = ['apple pie', 'spaghetti', 'mac and cheese', 'milk'];
	const [selectedRecipes, setSelectedRecipes] = useState([]);

	const selectRecipes = (e: any) => {
		const selected = [].slice.call(e.target.selectedOptions).map((item: any) => item.value);
		setSelectedRecipes(selected);
	};

	const handleClose = () => onCloseModal();

	return (<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			<Modal.Title>{day} {meal}</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			<Form.Group>
				<Form.Label>
                    Select recipes for this meal slot
				</Form.Label>
				<Form.Control as='select' multiple onChange={selectRecipes}>
					{
						recipeList.map((r, i) => {
							return <option key={i} value={r} disabled={selectedRecipes.includes(r)}>{r}</option>;
						})
					}
				</Form.Control>
			</Form.Group>
			<div>
            Selected Recipes: 
				<ListGroup>
					{ selectedRecipes.map((r, i) => {
						return <ListGroupItem key={i}>
							{r}
						</ListGroupItem>;
					})}
				</ListGroup>
			</div>
          
		</Modal.Body>
		<Button variant="secondary" onClick={handleClose}>
            Close
		</Button>
	</Modal>);
};

export default ScheduleModal; 