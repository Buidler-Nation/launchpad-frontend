import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import projectReducer from "./slices/project_slice";
import pendingTransactionsReducer from "./slices/pending_txn_slice";
import messagesReducer from "./slices/messages-slice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    projects: projectReducer,
    pendingTransactions: pendingTransactionsReducer,
    messages: messagesReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        const defaultMiddlewares = getDefaultMiddleware({ serializableCheck: false });
        if (process.env.NODE_ENV === `development`) {
            defaultMiddlewares.push(logger);
        }
        return defaultMiddlewares;
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;