import { createSlice } from "@reduxjs/toolkit";

const initialState = { currUsername: "" };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrUsername: (state, action) => {
            state.currUsername = action.payload.data;
        },
    },
});

export const { setCurrUsername } = userSlice.actions;
export default userSlice.reducer;
