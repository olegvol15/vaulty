import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateNoteContent, updateNoteTitle } from "../../actions";
import { LuSave } from "react-icons/lu";

export default async function NotePage({
  params,
}: {
  params: Promise<{
    id: string;
    noteId: string;
  }>;
}) {
  const { id, noteId } = await params;

  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      vaultId: id,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <article className="mx-auto min-h-screen w-full max-w-3xl px-10 py-16">
      <header className="pb-8">
        <form action={updateNoteTitle.bind(null, id, noteId)}>
          <input
            name="title"
            defaultValue={note.title}
            aria-label="Note title"
            className="w-full bg-transparent text-4xl font-semibold text-neutral-100 outline-none placeholder:text-neutral-600 focus:text-white"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-1.5 text-sm font-medium text-neutral-300 hover:border-[#555555] hover:bg-[#333333] hover:text-white"
            >
              <LuSave className="h-4 w-4" />
              Save
            </button>

            <p className="text-xs text-neutral-500">
              Last updated {note.updatedAt.toLocaleDateString()}
            </p>
          </div>
        </form>
      </header>

      <form
        action={updateNoteContent.bind(null, id, noteId)}
        className="border-t border-[#303030] pt-8"
      >
        <textarea
          name="content"
          defaultValue={note.content}
          placeholder="# Start writing..."
          spellCheck="true"
          className="min-h-96 w-full resize-none bg-transparent font-mono text-sm leading-
  7 text-neutral-300 outline-none placeholder:text-neutral-600"
        />

        <button
          type="submit"
          className="mt-4 rounded-md border border-[#3a3a3a] bg-[#2a2a2a] px-3 py-1.5
  text-sm font-medium text-neutral-300 hover:border-[#555555] hover:bg-[#333333]
  hover:text-white"
        >
          Save Markdown
        </button>
      </form>
    </article>
  );
}
