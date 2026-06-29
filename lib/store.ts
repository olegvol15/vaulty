import { configureStore } from "@reduxjs/toolkit";
import vaultReducer from "./slices/vaultSlice"
import { listenerMiddleware } from "./listenerMiddleware";
import preferencesReducer from "./slices/preferencesSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      vault: vaultReducer,
      preferences: preferencesReducer
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']