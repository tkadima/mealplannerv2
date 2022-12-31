import React from 'react';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';

import { Recipe } from '../types';
import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import ErrorAlert from '../../components/error-alert';

type PropTypes = {
  recipe: Recipe,
}
export const RecipePage = ({ recipe } : PropTypes) => {
	const [recipeChanges, setRecipeChanges] = useState({ ...recipe });
	const [error, setError] = useState(null); 

	const router = useRouter();


	// TODO use update mutation 
	const handleSubmitRecipe = () => {
		// axios.put(`/api/recipes/${recipe.id}`, recipeChanges)
		// 	.then(res => {
		// 		if (res.status === 200)  { router.push('/recipes');}
		// 	})
		// 	.catch(err => {
		// 		setError(err.message);
		// 		console.error(err);
		// 	});
	};

	const handleChangeRecipe = (changes: never) => {
		setRecipeChanges(changes);
	};

	return <Layout>
		{error && <ErrorAlert errorMessage={error}/>}
		<div className='recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
			<RecipeForm recipe={recipe} onRecipeChange={handleChangeRecipe} />
			<div className="col text-center" style={{ paddingTop: '10px' }} >
				<Button onClick={handleSubmitRecipe} type="submit">Submit</Button>
			</div>
		</div>
	</Layout>;
};
export default RecipePage;

export const getStaticPaths: GetStaticPaths = async() => {
	// TODO use graphql 
	const data  = await fetch('http:localhost:3000/api/recipes');
	const recipes = await data.json(); 
	const paths = recipes.map((recipe : Recipe) => ({params: {id: recipe.id.toString()}}));
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps = async ({ params }) => {
	// TODO use graphql 
	const data  = await fetch(`http:localhost:3000/api/recipes/${params.id}`);
	const recipe = await data.json() as Recipe; 

	return {
		props: {
			recipe
		}
	};
};
