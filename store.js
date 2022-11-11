import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './redux/shopping-list-slice'

export default configureStore({
    reducer: {
        shoppingList: shoppingListReducer
    },
})