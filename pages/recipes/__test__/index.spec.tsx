import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Recipes from '../index';
import { MockedProvider } from "@apollo/client/testing";


describe('Recipe index page', () => {
   
	it('Should display recipe index page', () => {
		render(<MockedProvider>
            <Recipes recipes={recipes}/>
            </MockedProvider>);

		expect(screen.getByRole('heading', { name: 'Recipes'} )).toBeInTheDocument();

        recipes.forEach(recipe => {
            expect(screen.getByRole( 'link', { name: recipe.name } )).toHaveAttribute('href', `/recipes/${recipe.id}`)
        })

        expect(screen.getByRole('link', { name: 'Add New'})).toHaveAttribute('href', '/recipes/new')
	});

});


const recipes = [
    {
        id: 1,
        name: 'White rice', 
        instructions: 'Boil water with salt and butter. Add rice and simmer for 17 minutes', 
        prepTime: 5, 
        cookTime: 20,
        serves: 4, 
        requiresOven: false, 
        requiresStovetop: true, 
        ingredients: [
        {
            id: 1, 
            quantity: 1,
            quantity2: null,
            unitOfMeasure: 'cup', 
            description: 'white rice',
            isGroupHeader: false,
            recipeId: 1,
            have: true
        },
        {
            id: 2,
            quantity: 2,
            quantity2: null,
            unitOfMeasure: 'cup', 
            description: 'water',
            isGroupHeader: false,
            recipeId: 1,
            have: true
        }, 
        {
            id: 3, 
            quantity: 1,
            quantity2: 1.5,
            unitOfMeasure: 'tsp', 
            description: 'salt',
            isGroupHeader: false,
            recipeId: 1,
            have: true
        }, 
        {
            id: 4, 
            quantity: 1,
            quantity2: null,
            unitOfMeasure: 'tbsp', 
            description: 'butter',
            isGroupHeader: false,
            recipeId: 1,
            have: true
        }, 
    ]
    }, 
    {
        id: 2, 
        name: 'Scrambled eggs', 
        instructions: 'Fry eggs in pan with salt and pepper', 
        prepTime: 1, 
        cookTime: 5, 
        serves: 1, 
        requiresOven: false, 
        requiresStovetop: true,
        ingredients: [
            {
                id: 5, 
                quantity: 1, 
                quantity2: null, 
                unitOfMeasure: null, 
                description: 'eggs', 
                isGroupHeader: false, 
                recipeId: 2, 
                have: true 
            }
        ]
    }
]