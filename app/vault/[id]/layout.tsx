import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createUntitledNote } from "./actions";
import { LuChevronLeft, LuFileText, LuPlus, LuSquarePen } from "react-icons/lu";

export default async function VaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const vault = await prisma.vault.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: {
          updatedAt: "desc",
        },
      },
    },
  });

  if (!vault) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-[#1e1e1e] text-neutral-100">
      <aside className="flex w-72 shrink-0 flex-col border-r border-[#2f2f2f] bg-[#262626]">
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
        </div>

        <nav className="flex-1 px-3 py-3">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-xs font-medium text-neutral-500">Files</p>

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

          {vault.notes.length > 0 ? (
            <ul className="space-y-0.5">
              {vault.notes.map((note) => (
                <li key={note.id}>
                  <Link
                    href={`/vault/${vault.id}/note/${note.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-white/[0.07] hover:text-neutral-100"
                  >
                    <LuFileText className="h-4 w-4 shrink-0 text-neutral-500" />
                    <span className="truncate">{note.title}</span>
                  </Link>
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
      </aside>

      <main className="min-w-0 flex-1 bg-[#1e1e1e]">{children}</main>
    </div>
  );
}
