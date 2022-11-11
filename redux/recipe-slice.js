import { createSlice } from "@reduxjs/toolkit";

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        recipes: []
    },
    reducers: {
        addRecipe: (state, action) => {
            state.recipes =  [...state.recipes, action.payload]
        }, 
        removeRecipe: (state, action) => {
            let index = state.recipes.indexOf(action.payload);
            state.recipes = [...state.recipes.slice(0, index),
            ...state.recipes.slice(index + 1)]
        },
        clearRecipeList: (state) => {
            state.recipes = []
        }
    }
})


export const { addRecipe, removeRecipe, clearRecipeList } = recipeSlice.actions; 
export default recipeSlice.reducer;