import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../AuthSlice/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "@/api/userApi/usersAPi";
import { driverApi } from "@/api/driverApi/driverApi";
import { bookingApi } from "@/api/bookingApi/BookingApi";

const persistConfig = {
  key: "Auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    Auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, driverApi.middleware, bookingApi.middleware);
  },
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
