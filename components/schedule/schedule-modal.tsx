import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {ButtonGroup, Form, ListGroup, ListGroupItem, Modal} from 'react-bootstrap';
import { Meal, Recipe } from '../types';
import { useForm } from 'react-hook-form';
import { TfiClose } from 'react-icons/tfi';

type PropTypes = {
    show: boolean, 
    onCloseModal: () => void,
    mealData?: Meal,
	recipes: Recipe[],
	onSave: (selected: Recipe[], unSelected: Recipe[]) => void;
}

const ScheduleModal = ({ show, onCloseModal, mealData, recipes, onSave} : PropTypes) => { // add onRemove prop

	const [removedRecipes, setRemovedRecipes] = useState([]); 

	const { register, handleSubmit } = useForm({});

	const nameRecipeMap = Object.assign({}, ...recipes.map(r => ({ [r.name]: r})));

	const handleSaveMeal = (data: {recipes: string[]}) => {
		const recipeList = data.recipes.map(r => nameRecipeMap[r]);
		onSave(recipeList, removedRecipes);
		setRemovedRecipes([]);
		onCloseModal();
	};

	const handleRemoveRecipe = (recipe: Recipe) => {
		if (removedRecipes.find(r => r.id === recipe.id)) {
			const newRemoved = removedRecipes.filter(r => r.id !== recipe.id);
			setRemovedRecipes(newRemoved);
		}
		else {
			const updatedRemoved = [...removedRecipes, recipe]; 
			setRemovedRecipes(updatedRemoved);
		}
	
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
					className="form-spacing"
					{...register('recipes')}
				>
					{
						Object.keys(nameRecipeMap).map((name, i) => {
							return <option 
								key={i} 
								disabled={mealData?.recipes?.some(r => r.name == name) }
								value={name}>
								{name} 
							</option>;
						})
					}
				</Form.Control>
				Recipes for this Meal: 
				<ListGroup className="form-spacing">
					{
						mealData?.recipes.map((recipe, i) => {
							return <ListGroupItem key={i} active={removedRecipes?.some(r => r.id === recipe.id)}>
								{recipe.name}
								<div className="float-right">
									<TfiClose onClick={() => handleRemoveRecipe(recipe)}/>
								</div>
							</ListGroupItem>;
						})
					}
				</ListGroup>
				<ButtonGroup>
					<Button variant="secondary" onClick={handleClose}>Cancel
					</Button>
					<Button variant="primary" type="submit">Save</Button>
				</ButtonGroup>
			</Form>
          
		</Modal.Body>
	</Modal>);
};

export default ScheduleModal; 