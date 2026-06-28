import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleSidebar } from "./slices/vaultSlice";
import type { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>()

startAppListening({
  actionCreator: toggleSidebar,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem("sidebarOpen", JSON.stringify(state.vault.sidebarOpen))
  }
})