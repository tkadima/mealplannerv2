/* eslint-disable no-mixed-spaces-and-tabs */
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Layout from '../../components/layout';
import RecipeListItem from '../../components/recipe/recipe-list-item';
import prisma from '../../lib/prisma';
import { Recipe } from '../../components/types';
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../../graphql/mutations/recipe-mutations';

type PropTypes = {
    recipes: Recipe[],
}

const Recipes = ({ recipes } : PropTypes) => {

	// TODO: use delete mutation 
	const [deleteRecipe] = useMutation(DELETE_RECIPE, {
		onError(err){
			console.error('error deleting recipe', JSON.stringify(err, null, 2));
		}
	});
	const handleDelete = (recipe: Recipe) => {
		deleteRecipe({variables: {deleteRecipeId: recipe.id} });
	};

	return (
		<Layout>
			<h3>Recipes</h3>
			{
				recipes?.length > 0 &&
                <ListGroup>
                	{ recipes.map((r: Recipe, i: number) => {
                		return <RecipeListItem key={`${i}-${r.name}`} recipeItem={r} onDelete={handleDelete}/>;})
                	}
                </ListGroup>
			}
			<div className="col text-center padding-md">
				<Link href="/recipes/new">
					<Button>Add New</Button>
				</Link>
			</div>
		</Layout>

	);
};

export default Recipes;

export const getServerSideProps = async() => {
	const recipes = await prisma.recipe.findMany(); 
	return { 
		props: { recipes }
	};
};