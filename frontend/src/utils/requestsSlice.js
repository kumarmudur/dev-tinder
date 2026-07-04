import {createSlice} from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            return state.filter((r) => r._id !== action.payload);
        },
    }
});

export const { addRequests, removeRequest } = requestsSlice.actions;

export default requestsSlice.reducer;