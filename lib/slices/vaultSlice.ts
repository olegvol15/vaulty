import { renameNote } from "@/app/vault/[id]/actions"
import {createSlice, type PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"

type VaultState = {
  sidebarOpen: boolean
  selectedNoteId: string | null
  searchQuery: string
  status: "loading" | "idle" | "error"
  error?: string | null
}

const initialState: VaultState = {
  sidebarOpen: true,
  selectedNoteId: null,
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
    selectNote(state, action: PayloadAction<string | null>) {
      state.selectedNoteId = action.payload
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(renameNoteThunk.pending, (state) => {state.status = "loading"})
      .addCase(renameNoteThunk.fulfilled, (state) => {state.status = "idle"})
      .addCase(renameNoteThunk.rejected, (state) => {state.status = "error"; state.error = "Failed to rename note"})
  }
})

export const {toggleSidebar, selectNote, setSearchQuery} = vaultSlice.actions;
export default vaultSlice.reducer;
