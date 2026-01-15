"use client";

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducer/userSlice";
import productSlice from "./Reducer/ProductSlice"

export const store = configureStore({
    reducer: {
        userReducer: userSlice ,
        productReducer  : productSlice,
    },
});

