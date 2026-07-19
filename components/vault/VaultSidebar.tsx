"use client";

import Link from "next/link";
import {
  LuChevronLeft,
  LuFileText,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPlus,
  LuSearch,
  LuSquarePen,
} from "react-icons/lu";
import { createUntitledNote } from "@/app/vault/[id]/actions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSearchQuery, toggleSidebar } from "@/lib/slices/vaultSlice";
import { useParams } from "next/navigation";
import { selectFilteredNotes } from "@/lib/selectors";
import { setNotesSortBy } from "@/lib/slices/preferencesSlice";
import DeleteNoteButton from "./DeleteNoteButton";

interface VaultSidebarProps {
  vault: {
    id: string;
    name: string;
    description?: string | null;
    notes: Array<{
      id: string;
      title: string;
    }>;
  };
}

export default function VaultSidebar({ vault }: VaultSidebarProps) {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.vault.sidebarOpen);
  const searchQuery = useAppSelector((state) => state.vault.searchQuery);
  const { noteId } = useParams<{ noteId?: string }>();

  const filteredNotes = useAppSelector((state) =>
    selectFilteredNotes(state, vault.notes),
  );

  const sortBy = useAppSelector((state) => state.preferences.notesSortBy);

  return (
    <aside
      className={
        sidebarOpen
          ? "flex w-72 shrink-0 flex-col border-r border-[#2f2f2f] bg-[#262626]"
          : "flex w-12 shrink-0 flex-col items-center border-r border-[#2f2f2f] bg-[#262626] py-2"
      }
    >
      {!sidebarOpen ? (
        <button
          type="button"
          aria-label="Open sidebar"
          title="Open sidebar"
          onClick={() => dispatch(toggleSidebar())}
          className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-100"
        >
          <LuPanelLeftOpen className="h-4 w-4" />
        </button>
      ) : (
        <>
          <Link
            href="/"
            className="flex h-10 items-center gap-2 border-b border-[#333333] px-4 text-xs font-medium text-neutral-400 hover:bg-white/[0.04] hover:text-neutral-100"
          >
            <LuChevronLeft className="h-4 w-4" />
            Back to vaults
          </Link>

          <div className="border-b border-[#333333] px-4 py-4">
            <h1 className="truncate text-sm font-semibold text-neutral-100">
              {vault.name}
            </h1>

            {vault.description ? (
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-neutral-500">
                {vault.description}
              </p>
            ) : null}

            <button
              type="button"
              onClick={() =>
                dispatch(
                  setNotesSortBy(sortBy === "recent" ? "title" : "recent"),
                )
              }
              title="Toggle sort"
              className="text-xs text-neutral-500 hover:text-neutral-200"
            >
              {sortBy === "recent" ? "Recent" : "A-Z"}
            </button>
          </div>

          <nav className="flex-1 px-3 py-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-xs font-medium text-neutral-500">Files</p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Close sidebar"
                  title="Close sidebar"
                  onClick={() => dispatch(toggleSidebar())}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-100"
                >
                  <LuPanelLeftClose className="h-4 w-4" />
                </button>

                <form action={createUntitledNote.bind(null, vault.id)}>
                  <button
                    type="submit"
                    aria-label="Create note"
                    title="Create note"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-100"
                  >
                    <LuSquarePen className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

            <label className="mb-3 flex items-center gap-2 rounded-md border border-[#333333] bg-black/10 px-2 py-1.5 text-neutral-500 focus-within:border-[#555555] focus-within:text-neutral-300">
              <LuSearch className="h-4 w-4 shrink-0" />
              <span className="sr-only">Search notes</span>
              <input
                value={searchQuery}
                onChange={(event) =>
                  dispatch(setSearchQuery(event.currentTarget.value))
                }
                placeholder="Search notes"
                className="min-w-0 flex-1 bg-transparent text-sm text-neutral-200 outline-none placeholder:text-neutral-600"
              />
            </label>

            {filteredNotes.length > 0 ? (
              <ul className="space-y-0.5">
                {filteredNotes.map((note) => (
                  <li key={note.id} className="group flex items-center gap-1">
                    <Link
                      href={`/vault/${vault.id}/note/${note.id}`}
                      className={
                        noteId === note.id
                          ? "flex flex-1 min-w-0 items-center gap-2 rounded-md bg-white/[0.08] px-2 py-1.5 text-sm text-neutral-100"
                          : "flex flex-1 min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-100"
                      }
                    >
                      <LuFileText className="h-4 w-4 shrink-0 text-neutral-500" />
                      <span className="truncate">{note.title}</span>
                    </Link>

                    <DeleteNoteButton
                      vaultId={vault.id}
                      noteId={note.id}
                      isActive={noteId === note.id}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <form action={createUntitledNote.bind(null, vault.id)}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 rounded-md border border-dashed border-[#444444] px-3 py-3 text-left text-sm text-neutral-500 hover:border-[#5a5a5a] hover:bg-white/[0.04] hover:text-neutral-300"
                >
                  <LuPlus className="h-4 w-4" />
                  Create first note
                </button>
              </form>
            )}
          </nav>
        </>
      )}
    </aside>
  );
}
