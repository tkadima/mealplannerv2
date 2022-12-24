import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState } from 'react';
import { Recipe } from '../../pages/types';
import { convertIngredientToStringObject } from '../../pages/recipes/helpers';
import IngredientInput from './ingredient-input';
import Button from 'react-bootstrap/Button';

type PropTypes = {
    recipe: Recipe, 
    onRecipeChange: (change: unknown) => void 
}
export type formIngredient = {
	id: number, 
	quantity: string, 
	unit: string, 
	description: string
}; 

const RecipeForm = ({ recipe, onRecipeChange }: PropTypes) => {
	const [formRecipe, setFormRecipe] = useState({name: recipe.name, 
		instructions: recipe.instructions, prepTime: recipe.prepTime, 
		cookTime: recipe.cookTime, yields: recipe.yields});

	const [ingredientText, setIngredientText] = useState(recipe.ingredients ? 
		recipe.ingredients.map(r => convertIngredientToStringObject(r)) : []);
    
	const [changes, setChanges] = useState({});

	const [addingIngredient, setAddingIngredient] = useState(false);

	const handleChangeForm = (e: { target: {name: string, value: string, id: string}}) => {
		const newRecipe = { ...formRecipe, [e.target.name]: e.target.value };
		let newChanges: object; 
		setFormRecipe(newRecipe);
		const name = e.target.name; 

		if (name === 'prepTime' || name === 'cookTime' || name === 'yields') {
			newChanges = {...changes, [name]: parseInt(e.target.value)};
		}
		
		else {
			newChanges = {...changes, [e.target.name]: e.target.value};
		}
		setChanges(newChanges);
		onRecipeChange(newChanges);
	};

	const handleAddIngredient = (ingredient: formIngredient) => {
		setIngredientText([...ingredientText, ingredient]);
		setAddingIngredient(false);
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
				{
					ingredientText.map((ingredient, i) => {
						return <IngredientInput key={i} 
							ingredient={ingredient} 
							onChangeIngredient={handleChangeForm} 
							isNew={false}
							disabled={addingIngredient}
						/>;
					})
				}
				{
					addingIngredient && 
					<IngredientInput 
						ingredient={{id: null, quantity: '', unit: '', description: ''}} 
						onChangeIngredient={handleChangeForm} 
						isNew 
						disabled={false}
						onAddIngredient={handleAddIngredient}
					/>
				}
				{
					!addingIngredient &&
					<Button style={{ marginLeft: '100px', marginBottom: '30px'}} onClick={() => {
						return setAddingIngredient(true);
					}}>Add Ingredient</Button>
				}

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
						type="number"
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
