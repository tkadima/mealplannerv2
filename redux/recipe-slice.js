import { createSlice } from "@reduxjs/toolkit";
import  data from '../pages/api/data.json'

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: data.recipes// is there a better way of initializing store data ? 
    },
    reducers: {
        addRecipe: (state, action) => {
            state.recipes =  [...state.recipes, action.payload]
        }, 
        removeRecipe: (state, action) => {
            state.recipes = [...state.recipes.slice(0, action.payload),
            ...state.recipes.slice(action.payload + 1)]
        },
        // updates in store but is not reflected on we return to the page 
        editRecipe: (state, action) => {
            console.log('reducer action', action.payload)
            state.recipes = state.recipes.map(recipe => recipe.id === action.payload.id ? 
                action.payload: recipe)
        },
        clearRecipeList: (state) => {
            state.recipes = []
        },
    },
})


export const { addRecipe, removeRecipe, editRecipe, clearRecipeList } = recipeSlice.actions; 
export default recipeSlice.reducer;