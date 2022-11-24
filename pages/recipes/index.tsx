import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import Layout from '../../components/layout';
import RecipeListItem from '../../components/recipe-list-item';
import React from 'react';
import { Recipe } from '../../types';

type PropTypes = {
    recipes: Recipe[],
    setRecipes: Function
}
const Recipes = ({recipes, setRecipes} : PropTypes) => {

    const handleDelete = (recipe: Recipe) => {
        setRecipes(recipes.filter((r: { id: number; }) => r.id !== recipe.id));
    }

    return (
        <Layout>
            <h3>Recipes</h3>
            {
                recipes.length > 0 &&
                <ListGroup>
                    { recipes.map((r: Recipe) => {
                        return <RecipeListItem key={`${r.id}-${r.name}`} recipeItem={r} onDelete={handleDelete}/>})
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
}

export default Recipes;