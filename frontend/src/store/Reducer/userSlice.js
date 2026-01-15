import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,            //  object hoga
  isAuthenticated: false //  auth state
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // ✅ login ke time
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // ✅ logout ke time 
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loadUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
