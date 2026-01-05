import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authSlice.js";
import teachersReducer from "./teachersSlice.js";
import filtersMetaReducer from "./filtersMetaSlice.js";
import filtersReducer from "./filtersSlice.js";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  teachers: teachersReducer,
  filtersMeta: filtersMetaReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
