import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { Recipe } from '../types';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import ErrorAlert from '../../components/error-alert';

type PropTypes = {
    recipes: Recipe[],
    setRecipes: (recipes: Recipe[]) => void
}

const NewRecipe = ({recipes, setRecipes}: PropTypes) => {

	const router = useRouter();

	const [recipe, setRecipe] = useState<Recipe>(
		{name: '', ingredients: null, instructions: '',  prepTime: null, cookTime: null, yields: null});
	
	const [error, setError] = useState(null); 


	// use create mutation 
	const handleSubmitRecipe = () => {
		// axios.post('/api/recipes', recipe)
		// 	.then(res => {
		// 		setRecipes([...recipes, res.data]);
		// 		if (res.status === 200) router.push('/recipes');
		// 	})
		// 	.catch(error => {
		// 		setError(error.message);
		// 		console.error(error);
		// 	});
       
	};

	const createRecipe = (recipe: Recipe) => {
		setRecipe(recipe);
	};

	return (
		<Layout>
			<h3>Create New Recipe</h3>
			<div style={{ padding: '10px 0px'}}>
				<div className=' recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
					<RecipeForm recipe={recipe} onRecipeChange={createRecipe}/>
					{ error && <ErrorAlert errorMessage={error}/> }
					<div className="col text-center" style={{ paddingTop: '60px'}} >
						<Button onClick={handleSubmitRecipe} type="submit">Submit</Button>
					</div>
				</div>
			</div>

		</Layout>
	);
};

export default NewRecipe;