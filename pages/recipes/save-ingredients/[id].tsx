import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { GetStaticPaths } from 'next/types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import IngredientCard from '../../../components/recipe/ingredient-card';
import { Food, Ingredient } from '../../../components/types';
import { ADD_FOOD } from '../../../graphql/mutations/food-mutation';
import { UPDATE_INGREDIENT_FOOD_ID } from '../../../graphql/mutations/ingredient-mutations';
import prisma from '../../../lib/prisma';

type PropTypes = {
    ingredients: Ingredient[], 
    foods: Food[]
}
const HandleIngredients = ({ ingredients, foods }: PropTypes) => { 

    const [ingredientList, setIngredientList] = useState([]);
    
    const [addFood] = useMutation(ADD_FOOD, {
        onError(err){
			console.error('error creating food', JSON.stringify(err, null, 2));
		},
        onCompleted(data) {
            const ingredientId = data.createFood.ingredients[0].id;
            const updatedIngredients = ingredientList.filter(ingredient => ingredient.id !== ingredientId);
            setIngredientList(updatedIngredients)
        }
    })

    const [updateIngredientFoodId] = useMutation(UPDATE_INGREDIENT_FOOD_ID, {
        onError(err) {
            console.error('error updating ingredient.foodId', JSON.stringify(err, null, 2))
        },
        onCompleted(data) {
            const updatedIngredientId = data.updateIngredientFoodIdMutation.id; 
            const updatedIngredients = ingredientList.map(ingredient => {
                if (ingredient.id === updatedIngredientId) {
                    return {...ingredient, foodId: data.updateIngredientFoodIdMutation.foodId }
                }
                else return ingredient 
                
            }); 
            setIngredientList(updatedIngredients);
        }
    });

    useEffect(() => {
        setIngredientList(ingredients);
    }, [])

    const handleSubmitFood = (food: Food, ingredientId: number) => {
        addFood({ variables: { newData: food, ingredientId }});
    }

    const handleSavingIngredientToFood = (ingredientId: number, foodId: number) => {
        updateIngredientFoodId({variables: { ingredientId, foodId, attach: true}});
    }

    const handleResettingIngredient = (ingredientId: number, foodId: number) => {
        updateIngredientFoodId({variables: { ingredientId, foodId, attach: false}});
    }

    return (
        <div>
            <h3>Save the Following Ingredients?</h3>
            { 
                ingredientList.map((ingredient: Ingredient) => {
                    return (<IngredientCard 
                        key={ingredient.id} 
                        ingredient={ingredient} 
                        foodList={foods} 
                        onSubmitFood={handleSubmitFood}
                        onSaveIngredientToFood={handleSavingIngredientToFood}
                        completed={ingredient?.foodId !== null}
                        onReset={handleResettingIngredient}
                    />)
                })
            }
            <Link href='/recipes'><Button size="lg">Finish</Button></Link>
        </div>
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

    const allIngredients = unparsedIngredients.map((ingredient: prisma.ingredient)=> ({...ingredient, quantity: JSON.stringify(ingredient.quantity),
         quantity2: JSON.stringify(ingredient.quantity2)}));
    
    const ingredients = allIngredients.filter((ingredient: prisma.ingredient) => !ingredient.isGroupHeader)

    const unparsedFoods = await prisma.food.findMany({});
    const foods = unparsedFoods.map((food: prisma.food) => ({...food, quantity: JSON.stringify(food.quantity)}))

    return {
        props: {
            ingredients, 
            foods
        }
    }
}