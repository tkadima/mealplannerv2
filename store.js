import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './redux/shopping-list-slice'
import recipeReducer from './redux/recipe-slice'


export default configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
        recipes: recipeReducer
    },
})