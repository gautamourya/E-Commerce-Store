import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product : [],
}

const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        loadproduct : (state , action) =>{
            state.product = action.payload
        },
    },
});

export const {loadproduct} = productSlice.actions
export default productSlice.reducer