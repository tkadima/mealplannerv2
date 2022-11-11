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
            let index = state.shoppingList.indexOf(action.payload);
            state.shoppingList = [...state.shoppingList.slice(0, index),
            ...state.shoppingList.slice(index + 1)]
        },
        clearList: (state) => {
            state.shoppingList = []
        }
    }
})


export const { addItem, removeItem, clearList } = shoppingListSlice.actions; 
export default shoppingListSlice.reducer;