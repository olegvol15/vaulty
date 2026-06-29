import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SortBy = "recent" | "title";

type PreferencesState = {
  notesSortBy: SortBy
}

const initialState: PreferencesState = {
  notesSortBy: "recent"
}

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setNotesSortBy(state, action: PayloadAction<SortBy>) {
      state.notesSortBy = action.payload
    }
  }
})

export const { setNotesSortBy } = preferencesSlice.actions;
export default preferencesSlice.reducer;