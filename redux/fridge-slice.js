import { createSlice } from "@reduxjs/toolkit";
import data from '../data.json';

export const fridgeSlice = createSlice({
    name: 'fridge',
    initialState: {
        fridge: data.fridge
    },
    reducers: {
        addFood: (state, action) => {
            state.fridge =  [...state.fridge, action.payload]
        }
    }
})


export const { addFood } = fridgeSlice.actions; 
export default fridgeSlice.reducer;