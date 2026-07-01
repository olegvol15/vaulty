import { createAction } from "@reduxjs/toolkit";

export const titleEdited = createAction<{
  vaultId: string
  noteId: string
  title: string
}>("note/titleEdited")

