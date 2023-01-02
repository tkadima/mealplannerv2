import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';

import Layout from '../../components/layout';
import RecipeForm from '../../components/recipe/recipe-form';
import prisma from '../../lib/prisma';
import { Recipe } from '../../components/types';
import { useMutation } from '@apollo/client';
import { EDIT_RECIPE } from '../../graphql/mutations/recipe-mutations';

type PropTypes = {
  recipe: Recipe,
}
export const RecipePage = ({ recipe } : PropTypes) => {
	const router = useRouter();

	const [updateRecipe] = useMutation(EDIT_RECIPE, {
		onError(err){
			console.error('error deleting recipe', JSON.stringify(err, null, 2));
		},
		onCompleted(){
			router.push('/recipes');
		}
	}); 

	const handleSubmitRecipe = (recipeChanges: object, recipeId: number) => {
		console.log(recipeId, recipeChanges);
		updateRecipe({variables:{ recipeId, newData: recipeChanges} });
	};

	return <Layout>
		<div className='recipe-form'  style={{ width: '50%', float:'left', padding: '20px' }}>
			<RecipeForm currentRecipe={recipe} onSubmitRecipe={handleSubmitRecipe} />
		</div>
	</Layout>;
};
export default RecipePage;

export const getStaticPaths: GetStaticPaths = async() => {
	const recipes = await prisma.recipe.findMany(); 
	const paths = recipes.map((recipe: {id: number}) => ({params: {id: recipe.id.toString()}}));
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


	const recipe = JSON.parse(JSON.stringify({...prismaRecipe, ingredients: ingredients}));

	return {
		props: {
			recipe
		}
	};
};
