import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import customersReducer from "features/customers/customersSlice";
import productsReducer from "features/products/productsSlice";
import brandReducer from "features/brands/brandSlice";
import categoryReducer from "features/categories/categorySlice";
import adminReducer from "features/admin/adminSlice";

//Create a rootReducer by combining individual reducers. This rootReducer will handle the global state of your application.
const rootReducer = combineReducers({
    customerR: customersReducer,
    productsR: productsReducer,
    brandsR: brandReducer,
    categoriesR: categoryReducer,
    adminR: adminReducer,
});

const persistConfig = {
    //key under which the persisted state will be saved in the storage.
    key: "root",
    //storage engine used to store the state. In this case we use the browser's localStorage
    storage,
    //This is an array of reducer keys that will be persist. Only the state slices corresponding to these keys will be persisted
    whitelist: ["customerR", "productsR"],
};
//When use the persistedReducer to create Redux store, the redux-persist library will automatically persist the whitelisted state slices to the storage engine whenever the state changes. When the application loads, redux-persist will also rehydrate the state from the storage back into the Redux store, ensuring that the persisted data is available across sessions.
const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
    },
});

export const store = configureStore({
    reducer: persistedReducer,
    middleware: customizedMiddleware,
});

//used to control the persisting and rehydrating process.
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
