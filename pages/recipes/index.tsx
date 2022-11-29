/* eslint-disable no-mixed-spaces-and-tabs */
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import Layout from '../../components/layout';
import RecipeListItem from '../../components/recipe-list-item';
import React from 'react';
import { Recipe } from './types';
import axios from 'axios';


type PropTypes = {
    recipes: Recipe[],
    setRecipes: (recipes: Recipe[]) => void
}

const Recipes = ({ recipes, setRecipes } : PropTypes) => {

	const handleDelete = (recipe: Recipe) => {
		axios.delete(`/api/recipes/${recipe.id}`)
			.then(res => {
				if (res.status === 200) {
					const newRecipeList = recipes.filter(r => r.id !== recipe.id);
					setRecipes(newRecipeList);
				}
			})
			.catch(err => {
				console.error('Error occured while deleted', err);
			});
	};

	return (
		<Layout>
			<h3>Recipes</h3>
			{
				recipes.length > 0 &&
                <ListGroup>
                	{ recipes.map((r: Recipe) => {
                		return <RecipeListItem key={`${r.id}-${r.name}`} recipeItem={r} onDelete={handleDelete}/>;})
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