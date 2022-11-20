import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './redux/shopping-list-slice'
import recipeReducer from './redux/recipe-slice'
import fridgeReducer from './redux/fridge-slice'

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    recipes: recipeReducer,
    fridge: fridgeReducer
  }
})