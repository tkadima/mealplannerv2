import React from 'react';
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

	return <Layout>
		{error && <ErrorAlert errorMessage={error}/>}
		<div className='recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
			<RecipeForm onSubmitRecipe={handleSubmitRecipe} />
		</div>
	</Layout>;
};
export default RecipePage;

export const getStaticPaths: GetStaticPaths = async() => {
	// TODO use prisma
	const data  = await fetch('http:localhost:3000/api/recipes');
	const recipes = await data.json(); 
	const paths = recipes.map((recipe : Recipe) => ({params: {id: recipe.id.toString()}}));
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps = async ({ params }) => {
	// TODO use prisma findUnique 
	const data  = await fetch(`http:localhost:3000/api/recipes/${params.id}`);
	const recipe = await data.json() as Recipe; 

	return {
		props: {
			recipe
		}
	};
};
