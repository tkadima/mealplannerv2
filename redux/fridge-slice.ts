import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../types";

export type fridgeSliceState = {
    fridge: Item[]
}

export const fridgeSlice = createSlice({
    name: 'fridge',
    initialState: {
        fridge: []
    },
    reducers: {
        addFood: (state, action) => {
            [...state.fridge, action.payload]
        }
    }
})


export const { addFood } = fridgeSlice.actions; 
export default fridgeSlice.reducer;