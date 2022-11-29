import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import { Recipe } from '../pages/types';
import { convertIngredientToString } from '../pages/recipes/helpers';
import { parseIngredient } from 'parse-ingredient';

type PropTypes = {
    recipe: Recipe, 
    onRecipeChange: (change: unknown) => void 
}
const RecipeForm = ({ recipe, onRecipeChange }: PropTypes) => {

	const [formRecipe, setFormRecipe] = useState({name: recipe.name, 
		instructions: recipe.instructions, prepTime: recipe.prepTime, 
		cookTime: recipe.cookTime, yields: recipe.yields});

	const [ingredientText, setIngredientText] = useState(recipe.ingredients ? 
		recipe.ingredients.map(r => convertIngredientToString(r)).join('\n') : '');
    
	const [changes, setChanges] = useState({});

	const handleChangeForm = (e: { target: {name: string, value: string}}) => {
		const newRecipe = { ...formRecipe, [e.target.name]: e.target.value };
		let newChanges = {...changes}; 
		setFormRecipe(newRecipe);
		const name = e.target.name; 

		if (name === 'prepTime' || name === 'cookTime' || name === 'yields') {
			newChanges = {...changes, [name]: parseInt(e.target.value)};
		}
		else if (name === 'ingredients') {
			setIngredientText(e.target.value);
			newChanges = {...changes, ingredients: parseIngredient(e.target.value)};
		}
		else {
			newChanges = {...changes, [e.target.name]: e.target.value};
		}
		setChanges(newChanges);
		onRecipeChange(newChanges);
	};

	return (
		<Form>
			<Form.Group>
				<Form.Control
					as="input"
					name="name"
					value={formRecipe.name}
					onChange={handleChangeForm}
					style={{ marginBottom: '30px' }}
					placeholder="Enter recipe title"
				/>
				<Form.Control
					as="textarea"
					name="ingredients"
					rows={7}
					placeholder="Enter recipe ingredients e.g. 1 cup vegetable broth"
					value={ingredientText}
					onChange={handleChangeForm}
					style={{ marginBottom: '30px' }}
				/>

				<Form.Control
					as="textarea"
					name="instructions"
					rows={7}
					placeholder="Enter cooking instructions as a list. e.g. 1. Chop onions"
					value={formRecipe.instructions}
					onChange={handleChangeForm}
					style={{ marginBottom: '30px' }}
				/>

				<InputGroup style={{ padding: '20px' }}>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="prepTime"
						placeholder="Add prep time (minutes)"
						type="number"
						value={formRecipe.prepTime || ''}
						onChange={handleChangeForm}
					/>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="cookTime"
						placeholder="Add cooking time (minutes)"
						value={formRecipe.cookTime || ''}
						onChange={handleChangeForm}
					/>
					<Form.Control
						style={{ margin: '20px' }}
						as="input"
						name="yields"
						placeholder="Add yield amount"
						value={formRecipe.yields || ''} 
						onChange={handleChangeForm}
					/>
				</InputGroup>
			</Form.Group>
		</Form>);
};

export default RecipeForm;
