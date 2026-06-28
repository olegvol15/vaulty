import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateNoteContent } from "../../actions";
import NoteTitleForm from "@/components/vault/NoteTitleForm";

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
        <NoteTitleForm vaultId={id} noteId={noteId} title={note.title} />
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
