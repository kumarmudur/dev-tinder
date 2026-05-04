import { configureStore } from "@reduxjs/toolkit";

import connectionsReducer from "./connectionsSlice";
import feedReducer from "./feedSlice";
import requestsReducer from "./requestsSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
    reducer: {
        connections: connectionsReducer,
        feed: feedReducer,
        user: userReducer,
        requests: requestsReducer,
    }
});

export default appStore;