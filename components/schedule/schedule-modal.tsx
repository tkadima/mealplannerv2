/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Form, ListGroup, ListGroupItem, Modal, ModalFooter} from 'react-bootstrap';
import { Recipe } from '../types';

type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    day: string, 
    meal: string
	recipes: Recipe[]
}

const ScheduleModal = ({ show, onCloseModal, day, meal, recipes} : PropTypes) => {

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
			<Form>
				<Form.Label>
                    Select recipes for this meal slot
				</Form.Label>
				<Form.Control as='select' multiple onChange={selectRecipes} style={{ marginBottom: '30px' }}>
					{
						recipes.map((r, i) => {
							return <option key={i} value={r.name} disabled={selectedRecipes.includes(r)}>{r.name}</option>;
						})
					}
				</Form.Control>
			</Form>
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
		<ModalFooter>
			<Button variant="secondary" onClick={handleClose}>
            Cancel
			</Button>
			<Button variant="primary">Save</Button>
		</ModalFooter>
		
	</Modal>);
};

export default ScheduleModal; 