import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { parseIngredient } from 'parse-ingredient';
import { Ingredient, Recipe } from '../types';


type PropTypes = {
	onSubmitRecipe: (data: Recipe) => void;
	currentRecipe?: Recipe;
}
const RecipeForm = ({ onSubmitRecipe, currentRecipe }: PropTypes) => {
	
	const convertStringToIngredient = (ingredientString: string) => {
		const parsedIngredients = parseIngredient(ingredientString);
		return parsedIngredients.map(i => {
			return { quantity: i.quantity, unitOfMeasure: i.unitOfMeasure, description: i.description};
		});
	};

	const convertIngredientToString = (ingredients: Ingredient[]) => {
		if (!ingredients || ingredients.length === 0) return '';
		const ingredientStrings = ingredients.map(ingredient => {
			const quantity = ingredient.quantity ?? '';
			const unit = ingredient.unitOfMeasure  ?? '';
			return `${quantity} ${unit} ${ingredient.description}`;
		});
		
		return ingredientStrings.join('\n');
	};

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
		onSubmitRecipe(recipe);
	};

	
	return (
		<Form onSubmit={handleSubmit(handleSubmitRecipe)}>
			<Form.Group>
				<Form.Control
					as="input"
					name="name"
					placeholder="Enter recipe title"
					style={{ marginBottom: '30px' }}
					{...register('name', { required: true })}
				/>

				<Form.Control
					as="textarea"
					name="ingredients"
					rows={7}
					placeholder="Enter ingredients, one ingredient per line" 
					style={{ marginBottom: '30px' }}
					{...register('ingredients')}
				/>

				<Form.Control
					as="textarea"
					name="instructions"
					rows={7}
					placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
					{...register('instructions')}
				/>

				<InputGroup style={{ padding: '20px' }}>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="prepTime"
						placeholder="Add prep time (minutes)"
						{...register('prepTime')}
					/>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="cookTime"
						placeholder="Add cook time (minutes)"
						{...register('cookTime')}
					/>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="serves"
						placeholder="Number of servings"
						{...register('serves')}
					/>
				</InputGroup>
			</Form.Group>
			<div className="col text-center" style={{ paddingTop: '60px'}} >
				{/* Add cancel and/or reset button */}
				<Button type="submit">Submit</Button>
			</div>
		</Form>);

};

export default RecipeForm;
