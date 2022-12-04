import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';

type PropTypes = {
	ingredient: {id: number, quantity: string, unit: string, description: string},
	onChangeIngredient: (e: { target: {name: string, value: string}}) => void,
	isNew: boolean,
	disabled: boolean,
	onAddIngredient?: (ing: object) => void
}


const IngredientInput = ({ingredient, isNew, disabled, onAddIngredient}: PropTypes) => {
	const [formIngredient, setFormIngredient] = useState({...ingredient});
	const [ingredientChanges, setIngredientChanges] = useState({});

	const onChangeInput = (e: { target: {name: string, value: string}}) => {
		setFormIngredient({...formIngredient, [e.target.name]: e.target.value});
		setIngredientChanges({...ingredientChanges, [e.target.name]: e.target.value}); 
	}; 

	const handleSubmitIngredient = () => {
		onAddIngredient(ingredientChanges);
	};
	return (
		<InputGroup style={{ marginBottom: '30px' }}>
			<Form.Control
				as="input"
				name="quantity"
				id={`quantity-${ingredient.id}`}
				value={formIngredient.quantity}
				placeholder="quantity"
				onChange={onChangeInput}
				disabled={disabled}
			/>
			<Form.Control
				as="input"
				name="unit"
				id={'unit'}
				value={formIngredient.unit}
				placeholder="Enter unit"
				onChange={onChangeInput}
				disabled={disabled}
			/>
			<Form.Control
				as="input"
				name="description"
				value={formIngredient.description}
				placeholder="Enter max quantity (optional)"
				onChange={onChangeInput}
				disabled={disabled}
			/>
			{
				isNew && 
				<Button onClick={handleSubmitIngredient}>Submit</Button>
			}
            
		</InputGroup>
	);

};
export default IngredientInput; 