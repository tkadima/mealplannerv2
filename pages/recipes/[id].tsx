import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';

import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import prisma from '../../lib/prisma';

type PropTypes = {
  recipe: string,
}
export const RecipePage = ({ recipe } : PropTypes) => {
	const router = useRouter();

	// TODO use update mutation 
	const handleSubmitRecipe = () => {
		router.push('/recipes');
	};

	return <Layout>
		<p>{}</p>
		<div className='recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
			<RecipeForm currentRecipe={JSON.parse(recipe)} onSubmitRecipe={handleSubmitRecipe} />
		</div>
	</Layout>;
};
export default RecipePage;

export const getStaticPaths: GetStaticPaths = async() => {
	const recipes = await prisma.recipe.findMany(); 
	const paths = recipes.map((recipe) => ({params: {id: recipe.id.toString()}}));
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps = async ({ params }) => {
	const prismaRecipe = await prisma.recipe.findUnique({
		where: {id: parseInt(params.id)},
		include: {
			ingredients: true
		}
	}); 

	const ingredients = prismaRecipe.ingredients ?? prismaRecipe.ingredients.map((ingredient) => ({
		...ingredient,
		quantity: ingredient.quantity,
		unitOfMeasure: ingredient.unitOfMeasure, 
		description: ingredient.description
	}));


	const recipe = JSON.stringify({...prismaRecipe, ingredients: ingredients});

	return {
		props: {
			recipe
		}
	};
};
