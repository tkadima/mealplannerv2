import { createSlice } from "@reduxjs/toolkit";

export const fridgeSlice = createSlice({
    name: 'fridge',
    initialState: {
        fridge: []
    },
    reducers: {
        addFood: (state, action) => {
            state.fridge =  [...state.fridge, action.payload]
        }
    }
})


export const { addFood } = fridgeSlice.actions; 
export default fridgeSlice.reducer;