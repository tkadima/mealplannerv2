import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import { Recipe } from '../types';
import { convertIngredientToString, convertStringToIngredient, getChanges } from '../../helpers';
import ErrorAlert from '../error-alert';

type PropTypes = {
	onSubmitRecipe: (data: object, recipeId?: number) => void;
	currentRecipe?: Recipe;
}
const RecipeForm = ({ onSubmitRecipe, currentRecipe }: PropTypes) => {

	const { register, handleSubmit, formState: { errors }} = useForm({
		defaultValues: { 
			name: currentRecipe?.name || '', 
			ingredients: convertIngredientToString(currentRecipe?.ingredients) || [],
			instructions: currentRecipe?.instructions || '', 
			prepTime: currentRecipe?.prepTime || '', 
			cookTime: currentRecipe?.cookTime || '', 
			serves: currentRecipe?.serves || '', 
			requiresOven: currentRecipe?.requiresOven || false,
			requiresStovetop: currentRecipe?.requiresStovetop || false,
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
		<Form onSubmit={handleSubmit(handleSubmitRecipe)}>
			{
				Object.values(errors).map( (e,idx) => {
					return (<ErrorAlert key={idx} errorMessage={e.message}/>);
				})
			}
			<Form.Group>
				<div className='col'>
					<Form.Control
						className="form-spacing"
						as="input"
						name="name"
						placeholder="Enter recipe title"
						{...register('name', { 
							required: {
								value: true, 
								message: 'Recipe title cannot be empty'
							} 
						})}
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

					<InputGroup className="form-spacing">
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
				</div>
				<div className="col">
					<Form.Check 
						type="switch" 
						name="requiresOven" 
						label="Requires the oven?" 
						{...register('requiresOven')} 
					/>
					<Form.Check 
						type="switch" 
						name="requiresStovetop" 
						label="Requires the stovetop?" 
						{...register('requiresStovetop')} 
					/>
				</div>
			</Form.Group>
			<div className="col text-center">
				<Button type="submit">Submit</Button>
			</div>
		</Form>);

};

export default RecipeForm;
