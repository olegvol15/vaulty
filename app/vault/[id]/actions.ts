"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUntitledNote(vaultId: string) {
  const note = await prisma.note.create({
    data: {
      title: "Untitled Note",
      vaultId,
    },
  });

  redirect(`/vault/${vaultId}/note/${note.id}`);
}

export async function updateNoteTitle(
  vaultId: string,
  noteId: string,
  formData: FormData
) {
  const rawTitle = formData.get("title");
  const title = typeof rawTitle === "string" ? rawTitle.trim() : "";

  await prisma.note.update({
    where: {
      id: noteId,
    },
    data: {
      title: title || "Untitled Note",
    },
  });

  revalidatePath(`/vault/${vaultId}`);
  revalidatePath(`/vault/${vaultId}/note/${noteId}`);
}

export async function updateNoteContent(
  vaultId: string,
  noteId: string,
  formData: FormData
) {
  const rawContent = formData.get("content")
  const content = typeof rawContent === "string" ? rawContent : "";

  await prisma.note.update({
    where: {
      id: noteId
    },
    data: {
      content
    }
  })

  revalidatePath(`/vault/${vaultId}/note/${noteId}`)
}
