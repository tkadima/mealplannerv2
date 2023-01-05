import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import RecipeListItem from '../../components/recipe/recipe-list-item';
import { Recipe } from '../../components/types';
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../../graphql/mutations/recipe-mutations';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next/types';

type PropTypes = {
    recipes: Recipe[],
}

const Recipes = ({ recipes } : PropTypes) => {

	const [recipeList, setRecipeList] = useState([]);

	useEffect(() => {
		setRecipeList(recipes);
	}, []);

	const [deleteRecipe] = useMutation(DELETE_RECIPE, {
		onError(err){
			console.error('error deleting recipe', JSON.stringify(err, null, 2));
		},
		onCompleted(data){
			const res = data.deleteRecipe; 
			const newRecipeList = recipes.filter(r => r.id !== res.id);

			setRecipeList(newRecipeList);
		}
	});
	const handleDelete = (recipe: Recipe) => {
		deleteRecipe({variables: {deleteRecipeId: recipe.id} });
	};

	return (
		<Layout>
			<h3>Recipes</h3>
			{
				recipeList.length > 0 && 
				<ListGroup>
					{
						recipeList.map((recipe, i) => {
							return <RecipeListItem 
								key={`${i}-${recipe.name}`}
								recipeItem={recipe}
								onDelete={handleDelete}
							/>;
						})
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

export const getServerSideProps: GetServerSideProps = async () => {
	const recipes = await prisma.recipe.findMany(); 
	return {
		props: {
			recipes
		}
	};
};