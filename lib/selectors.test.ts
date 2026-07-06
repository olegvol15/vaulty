import { describe, it, expect } from "vitest"
import { selectFilteredNotes } from "./selectors"
import type { RootState } from "./store"

const makeState = (searchQuery: string, notesSortBy: "recent" | "title") =>
  ({
    vault: { sidebarOpen: true, searchQuery, status: "idle" },
    preferences: { notesSortBy },
  }) as RootState

const notes = [
  { id: "1", title: "Banana" },
  { id: "2", title: "apple" },
  { id: "3", title: "Cherry" },
]

describe("selectFilteredNotes", () => {
  it("filters by searchQuery", () => {
    const result = selectFilteredNotes(makeState("an", "recent"), notes);
    expect(result[0].title).toBe("Banana");
    expect(result.length).toEqual(1);
  })

  it("sorts by alphabet with title", () => {
    const result = selectFilteredNotes(makeState("", "title"), notes);
    expect(result.map(n => n.title)).toEqual(["apple", "Banana", "Cherry"])
  })

  it("saves initial order when recent", () => {
    const result = selectFilteredNotes(makeState("", "recent"), notes);
    expect(result).toEqual(notes)
  })
})