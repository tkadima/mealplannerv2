import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './shopping-list-slice'
import recipeReducer from './recipe-slice'
import fridgeReducer from './fridge-slice'

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    recipes: recipeReducer,
    fridge: fridgeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
