"use client"

import { useState } from "react";
import { LuSave } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { renameNoteThunk } from "@/lib/slices/vaultSlice";
import { titleEdited } from "@/lib/actions";

export default function NoteTitleForm({
  vaultId,
  noteId,
  title,
}: {
  vaultId: string;
  noteId: string;
  title: string;
}) {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.vault.status);

  const [value, setValue] = useState(title);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(renameNoteThunk({ vaultId, noteId, title: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <input
        name="title"
        value={value}
        onChange={(event) => {
          const next = event.target.value
          setValue(next)
          dispatch(titleEdited({vaultId, noteId, title: next}))
        }}
        aria-label="Note title"
        className="w-full bg-transparent text-4xl font-semibold text-neutral-100 outline-none placeholder:text-neutral-600 focus:text-white"
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-md border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-1.5 text-sm font-medium text-neutral-300 hover:border-[#555555] hover:bg-[#333333] hover:text-white disabled:opacity-50"
        >
          <LuSave className="h-4 w-4" />
          {status === "loading" ? "Saving…" : "Save"}
        </button>

        {status === "error" ? (
          <p className="text-xs text-red-400">Failed to rename note</p>
        ) : null}
      </div>
    </form>
  );
}
