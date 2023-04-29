import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrUsernameThunk } from "./usersThunk";

const initialState = { currUsername: "" };

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrUsernameThunk.fulfilled, (state, action) => {
            state.currUsername = action.payload.data.username;
        });
    },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
