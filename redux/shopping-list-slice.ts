import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types";

export type ShoppingListState = {
    shoppingList: Item[]
}

const initialState: ShoppingListState = { shoppingList: [] }

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        addItem: (state, action) => {
             [...state.shoppingList, action.payload]
        }, 
        removeItem: (state, action) => {
            let index = state.shoppingList.indexOf(action.payload);
            [...state.shoppingList.slice(0, index),
            ...state.shoppingList.slice(index + 1)]
        },
        clearList: (state) => {
            state.shoppingList = []
        }
    }
})


export const { addItem, removeItem, clearList } = shoppingListSlice.actions; 
export default shoppingListSlice.reducer;