import { renameNote } from "@/app/vault/[id]/actions"
import {createSlice, type PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"

type VaultState = {
  sidebarOpen: boolean
  searchQuery: string
  status: "loading" | "idle" | "error"
  error?: string | null
}

export const initialState: VaultState = {
  sidebarOpen: true,
  searchQuery: "",
  status: "idle"
}

export const renameNoteThunk = createAsyncThunk(
  "vault/renameNoteThunk",
  async (args: {vaultId: string, noteId: string, title: string}) => {
    return await renameNote(args.vaultId, args.noteId, args.title)
  }
)

const vaultSlice = createSlice({
  name: "vault",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(renameNoteThunk.pending, (state) => {state.status = "loading"})
      .addCase(renameNoteThunk.fulfilled, (state) => {state.status = "idle"})
      .addCase(renameNoteThunk.rejected, (state) => {state.status = "error"; state.error = "Failed to rename note"})
  }
})

export const {toggleSidebar, setSearchQuery, setSidebarOpen } = vaultSlice.actions;
export default vaultSlice.reducer;
