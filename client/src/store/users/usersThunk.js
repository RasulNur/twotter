import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrUsername } from "../../utils/api";

export const fetchCurrUsernameThunk = createAsyncThunk(
    "users/fetchUsername",
    (resUserID) => {
        return getCurrUsername(resUserID);
    }
);
