import {createSlice, type PayloadAction} from "@reduxjs/toolkit"

type VaultState = {
  sidebarOpen: boolean
  selectedNoteId: string | null
  searchQuery: string
}

const initialState: VaultState = {
  sidebarOpen: true,
  selectedNoteId: null,
  searchQuery: "",
}

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
  }
})

export const {toggleSidebar, selectNote, setSearchQuery} = vaultSlice.actions;
export default vaultSlice.reducer;
