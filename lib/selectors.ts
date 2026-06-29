import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "./store"

type NoteSummary = {
  id: string
  title: string
}

export const selectFilteredNotes = createSelector(
  [
    (state: RootState) => state.vault.searchQuery,
    (state: RootState) => state.preferences.notesSortBy,
    (_state: RootState, notes: NoteSummary[]) => notes,
  ],
  (searchQuery, sortBy, notes) => {
    const filtered = notes.filter((note) => 
      note.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    )

    if(sortBy === "title") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }
    
)