import { GetStaticPaths } from 'next/types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Layout from '../../../components/layout';
import SaveIngredientForm from '../../../components/recipe/save-ingredient-form';
import { Ingredient } from '../../../components/types';
import prisma from '../../../lib/prisma';

type PropTypes = {
    ingredients: Ingredient[], 
    foodNames: string[]
}
const HandleIngredients = ({ ingredients, foodNames }: PropTypes) => { 

    return (
        <Layout>
            <h3>Save the Following Ingredients?</h3>
            { 
                ingredients.map((ingredient: Ingredient) => {
                    return (<SaveIngredientForm ingredient={ingredient} foodList={foodNames}/>)
                })
            }
            <Button>Finish</Button>
        </Layout>
    );
}

export default HandleIngredients;

export const getStaticPaths: GetStaticPaths = async() => {
	const recipes = await prisma.recipe.findMany(); 
	const paths = recipes.map((recipe: {id: number}) => ({params: {id: recipe.id.toString()}}));
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps = async ({ params }) => {
    const unparsedIngredients = await prisma.ingredient.findMany({
        where: { recipeId: parseInt(params.id) }
    });

    const ingredients = unparsedIngredients.map(ingredient => ({...ingredient, quantity: JSON.stringify(ingredient.quantity), quantity2: JSON.stringify(ingredient.quantity2)}));
    

    const foods = await prisma.food.findMany({});
    const foodNames = foods.map((f: prisma.food) => f.name); 
    console.log('food names', foodNames);

    return {
        props: {
            ingredients, 
            foodNames
        }
    }
}