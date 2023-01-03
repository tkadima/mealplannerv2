import React from 'react';
import Button from 'react-bootstrap/Button';
import {ButtonGroup, Form, Modal, ModalFooter} from 'react-bootstrap';
import { Meal, Recipe } from '../types';
import { useForm } from 'react-hook-form';

type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    mealData?: Meal,
	recipes: Recipe[],
	onSave: (selected: string[]) => void; // we may need to pass recipe[] instead later, get from nameRecipeMap
}

const ScheduleModal = ({ show, onCloseModal, mealData, recipes, onSave} : PropTypes) => {

	const { register, handleSubmit } = useForm({});

	const nameRecipeMap = Object.assign({}, ...recipes.map(r => ({ [r.name]: r})));

	const handleSaveMeal = (data: string[]) => {
		onSave(data);
		onCloseModal();
	};

	const handleClose = () => onCloseModal();

	return (<Modal show={show} onHide={handleClose}>
		<Modal.Header closeButton>
			{
				mealData && 
				<Modal.Title>{mealData.day} {mealData.mealType}</Modal.Title>
			}
		</Modal.Header>
		<Modal.Body>
			<Form onSubmit={handleSubmit(handleSaveMeal)}>
				<Form.Label>
                    Select recipes for this meal slot
				</Form.Label>
				<Form.Control 
					as='select' 
					multiple 
					style={{ marginBottom: '30px' } }
					{...register('recipes')}
				>
					{
						Object.keys(nameRecipeMap).map((name, i) => {
							return <option 
								key={i} 
								disabled={mealData && mealData.recipes && mealData.recipes.includes(nameRecipeMap[name]) }
								value={name}>
								{name} 
							</option>;
						})
					}
				</Form.Control>
				<ButtonGroup>
					<Button variant="secondary" onClick={handleClose}>Cancel
					</Button>
					<Button variant="primary" type="submit">Save</Button>
				</ButtonGroup>
			</Form>
          
		</Modal.Body>
		<ModalFooter>
			
		</ModalFooter>
		
	</Modal>);
};

export default ScheduleModal; 