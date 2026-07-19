"use client";

import { useAppDispatch } from "@/lib/hooks";
import { deleteNoteThunk } from "@/lib/slices/vaultSlice";
import {useRouter} from "next/navigation";
import { LuTrash } from "react-icons/lu";

export default function DeleteNoteButton({
  vaultId,
  isActive,
  noteId,
}: {
  vaultId: string;
  noteId: string;
  isActive: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this note?")) return;
    await dispatch(deleteNoteThunk({ vaultId, noteId })).unwrap();
    if (isActive) router.push(`/vault/${vaultId}`);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      aria-label="Delete note"
      title="Delete note"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-neutral-500 opacity-0 group-hover:opacity-100 hover:bg-white/[0.07] hover:text-red-400"
    >
      <LuTrash className="h-4 w-4" />
    </button>
  );
}
