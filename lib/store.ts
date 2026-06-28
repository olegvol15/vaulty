import { configureStore } from "@reduxjs/toolkit";
import vaultReducer from "./slices/vaultSlice"
import { listenerMiddleware } from "./listenerMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      vault: vaultReducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']