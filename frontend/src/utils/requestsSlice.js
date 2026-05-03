import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => action.payload,
    }
});

export const { addRequests } = requestsSlice.actions;

export default requestsSlice.reducer;