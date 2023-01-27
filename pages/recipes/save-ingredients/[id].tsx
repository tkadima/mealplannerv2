import { useMutation } from '@apollo/client';
import { GetStaticPaths } from 'next/types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Layout from '../../../components/layout';
import SaveIngredientForm from '../../../components/recipe/save-ingredient-form';
import { Food, Ingredient } from '../../../components/types';
import { ADD_FOOD } from '../../../graphql/mutations/food-mutation';
import prisma from '../../../lib/prisma';

type PropTypes = {
    ingredients: Ingredient[], 
    foodNames: string[]
}
const HandleIngredients = ({ ingredients, foodNames }: PropTypes) => { 
    const [addFood] = useMutation(ADD_FOOD, {
        onError(err){
			console.error('error creating food', JSON.stringify(err, null, 2));
		}
    })

    const handleSubmitFood = (food: Food, ingredientId: number) => {
        console.log('submitting!', food.name);
        addFood({ variables: { food, ingredientId}});
    }
    return (
        <Layout>
            <h3>Save the Following Ingredients?</h3>
            { 
                ingredients.map((ingredient: Ingredient) => {
                    return (<SaveIngredientForm 
                        key={ingredient.id} 
                        ingredient={ingredient} 
                        foodList={foodNames} 
                        onSubmit={handleSubmitFood}
                    />)
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

    return {
        props: {
            ingredients, 
            foodNames
        }
    }
}