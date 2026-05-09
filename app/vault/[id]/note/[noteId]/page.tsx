  import { notFound } from "next/navigation";
  import { prisma } from "@/lib/prisma";

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
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-semibold text-white">
            {note.title}
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Last updated {note.updatedAt.toLocaleDateString()}
          </p>
        </header>

        <div className="mt-8 whitespace-pre-wrap text-sm leading-7 text-neutral-300">
          {note.content || "This note is empty."}
        </div>
      </article>
    );
  }