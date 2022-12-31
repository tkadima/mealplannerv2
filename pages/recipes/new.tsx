import React from 'react';
import { Recipe } from '../types';
import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';

type PropTypes = {
    recipes: Recipe[],
    setRecipes: (recipes: Recipe[]) => void
}

const NewRecipe = ({recipes, setRecipes}: PropTypes) => {

	// use create mutation 
	
	const handleSubmitRecipe = (recipe: Recipe) => {	
		console.log('recipe', recipe);
		setRecipes([...recipes, recipe]); 
	};

	return (
		<Layout>
			<h3>Create New Recipe</h3>
			<div style={{ padding: '10px 0px'}}>
				<div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
					<RecipeForm onSubmitRecipe={handleSubmitRecipe}/>
				</div>
			</div>

		</Layout>
	);
};

export default NewRecipe;