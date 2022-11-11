import { createSlice } from "@reduxjs/toolkit";

import data from '../data.json';

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: data.recipes
    },
    reducers: {
        addRecipe: (state, action) => {
            state.recipes =  [...state.recipes, action.payload]
        }, 
        removeRecipe: (state, action) => {
            state.recipes = [...state.recipes.slice(0, action.payload),
            ...state.recipes.slice(action.payload + 1)]
        },
        clearRecipeList: (state) => {
            state.recipes = []
        }
    }
})


export const { addRecipe, removeRecipe, clearRecipeList } = recipeSlice.actions; 
export default recipeSlice.reducer;