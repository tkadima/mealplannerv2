import { createSlice } from '@reduxjs/toolkit'
// import data from '../pages/api/data.json'
import { Recipe } from '../types'

export type RecipesSliceState = {
  recipes: Recipe[]
}

const initialState: RecipesSliceState = { recipes: [] } // need ORM to get from data 

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload]
    },
    removeRecipe: (state, action) => {
      state.recipes = [...state.recipes.slice(0, action.payload),
        ...state.recipes.slice(action.payload + 1)]
    },
    editRecipe: (state, action) => {
      state.recipes = state.recipes.map(recipe => recipe.id === action.payload.id
        ? action.payload
        : recipe)
    },
    clearRecipeList: (state) => {
      state.recipes = []
    }
  }
})

export const { addRecipe, removeRecipe, editRecipe, clearRecipeList } = recipeSlice.actions
export default recipeSlice.reducer
