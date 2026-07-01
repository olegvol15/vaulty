import { describe, it, expect } from "vitest";
import preferencesReducer, {setNotesSortBy} from "./preferencesSlice"

describe("preferencesSlice", () => {
  it("returns initial state", () => {
    const state = preferencesReducer(undefined, {type: "@@INIT"})
    expect(state.notesSortBy).toBe("recent")
  })

  it("setNotesSortBy changes value", () => {
    const state = preferencesReducer(
      {notesSortBy: "recent"},
      setNotesSortBy("title")
    )
    expect(state.notesSortBy).toBe("title")
  })
})