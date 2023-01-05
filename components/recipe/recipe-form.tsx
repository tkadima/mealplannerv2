import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { Recipe } from '../types';
import { convertIngredientToString, convertStringToIngredient, getChanges } from '../../helpers';

type PropTypes = {
	onSubmitRecipe: (data: object, recipeId?: number) => void;
	currentRecipe?: Recipe;
}
const RecipeForm = ({ onSubmitRecipe, currentRecipe }: PropTypes) => {

	const { register, handleSubmit } = useForm({
		defaultValues: { 
			name: currentRecipe?.name || '', 
			ingredients: convertIngredientToString(currentRecipe?.ingredients) || [],
			instructions: currentRecipe?.instructions || '', 
			prepTime: currentRecipe?.prepTime || '', 
			cookTime: currentRecipe?.cookTime || '', 
			serves: currentRecipe?.serves || '', 
		}
	});

	const handleSubmitRecipe = (recipeObj: object )=> {
		const recipe = {...recipeObj,
			prepTime: parseInt(recipeObj['prepTime']),
			cookTime: parseInt(recipeObj['cookTime']),
			serves: parseFloat(recipeObj['serves']),
			ingredients: convertStringToIngredient(recipeObj['ingredients'])
		} as Recipe;

		if (!currentRecipe)
			onSubmitRecipe(recipe);
		else {
			recipe.id = currentRecipe.id;
			const changes = getChanges(currentRecipe, recipe); 
			onSubmitRecipe(changes, recipe.id);
		}
	};

	return (
		// Add form validation
		<Form onSubmit={handleSubmit(handleSubmitRecipe)}>
			<Form.Group>
				<Form.Control
					className="form-spacing"
					as="input"
					name="name"
					placeholder="Enter recipe title"
					{...register('name', { required: true })}
				/>

				<Form.Control
					className="form-spacing"
					as="textarea"
					name="ingredients"
					rows={7}
					placeholder="Enter ingredients, one ingredient per line" 
					{...register('ingredients')}
				/>

				<Form.Control
					className="form-spacing"
					as="textarea"
					name="instructions"
					rows={7}
					placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
					{...register('instructions')}
				/>

				<InputGroup>
					<Form.Control
						className="number-input-spacing"
						as="input"
						name="prepTime"
						placeholder="Add prep time (minutes)"
						{...register('prepTime')}
					/>
					<Form.Control
						className="number-input-spacing"
						as="input"
						name="cookTime"
						placeholder="Add cook time (minutes)"
						{...register('cookTime')}
					/>
					<Form.Control
						className="number-input-spacing"
						as="input"
						name="serves"
						placeholder="Number of servings"
						{...register('serves')}
					/>
				</InputGroup>
			</Form.Group>
			<div className="col text-center">
				<Button type="submit">Submit</Button>
			</div>
		</Form>);

};

export default RecipeForm;
