/* eslint-disable no-mixed-spaces-and-tabs */
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Layout from '../../components/layout';
import RecipeListItem from '../../components/recipe/recipe-list-item';
import prisma from '../../lib/prisma';

type PropTypes = {
    recipes: [],
}

const Recipes = ({ recipes } : PropTypes) => {


	// TODO: use delete mutation 
	// const handleDelete = (recipe: Recipe) => {
	// 	axios.delete(`/api/recipes/${recipe.id}`)
	// 		.then(res => {
	// 			if (res.status === 200) {
	// 				const newRecipeList = recipes.filter(r => r.id !== recipe.id);
	// 				setRecipes(newRecipeList);
	// 			}
	// 		})
	// 		.catch(err => {
	// 			console.error('Error occured while deleted', err);
	// 		});
	// };

	return (
		<Layout>
			<h3>Recipes</h3>
			{
				recipes?.length > 0 &&
                <ListGroup>
                	{ recipes.map((r: {id: number, name: string}) => {
                		return <RecipeListItem key={`${r.id}-${r.name}`} recipeItem={r} />;})
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