import { createListenerMiddleware } from "@reduxjs/toolkit";
import { renameNoteThunk, toggleSidebar } from "./slices/vaultSlice";
import type { AppDispatch, RootState } from "./store";
import { toaster } from "@/components/ui/toast/toaster";
import { setNotesSortBy } from "./slices/preferencesSlice";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

startAppListening({
  actionCreator: toggleSidebar,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem(
      "sidebarOpen",
      JSON.stringify(state.vault.sidebarOpen),
    );
  },
});

startAppListening({
  actionCreator: renameNoteThunk.fulfilled,
  effect: () => {
    toaster.create({
      title: "Saved",
      type: "success",
    });
  },
});

startAppListening({
  actionCreator: renameNoteThunk.rejected,
  effect: () => {
    toaster.create({ title: "Failed to rename", type: "error" });
  },
});

startAppListening({
  actionCreator: setNotesSortBy,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem("notesSortBy", JSON.stringify(state.preferences.notesSortBy))
  }
})
