import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '../types'
import { RootState } from './store'

interface RecipeState {
  values: Recipe[]
}

const initialState = { values: []}

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.values = [...state.values, action.payload]
    },
    removeRecipe: (state, action: PayloadAction<number>) => {
      state.values = [...state.values.slice(0, action.payload),
        ...state.values.slice(action.payload + 1)]
    },
    editRecipe: (state, action: PayloadAction<Recipe>) => {
      state.values = state.values.map(recipe => recipe.id === action.payload.id
        ? action.payload
        : recipe)
    },
    clearRecipeList: (state) => {
      state.values = []
    }
  }
})

export const { addRecipe, removeRecipe, editRecipe, clearRecipeList } = recipeSlice.actions
export const selectRecipes = (state: RootState) => state.recipes.values
export default recipeSlice.reducer
