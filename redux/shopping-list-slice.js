import { createSlice } from "@reduxjs/toolkit";

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState: {
        shoppingList: []
    },
    reducers: {
        addItem: (state, action) => {
            state.shoppingList =  [...state.shoppingList, action.payload]
        }, 
        removeItem: (state, action) => {
            [...state.shoppingList.slice(0, action.payload)],
            [...state.shoppingList.slice(action.payload + 1)]
        }
    }
})


export const { addItem, removeItem } = shoppingListSlice.actions; 
export default shoppingListSlice.reducer;