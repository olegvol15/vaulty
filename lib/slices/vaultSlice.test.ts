import { describe, it, expect } from "vitest"
import vaultReducer, { toggleSidebar } from "./vaultSlice"

describe("vaultSlice", () => {
  it("toggleSidebar переключает sidebarOpen", () => {
    const state = vaultReducer(
      { sidebarOpen: true, searchQuery: "", status: "idle" },
      toggleSidebar(),
    )
    expect(state.sidebarOpen).toBe(false)
  })
})
