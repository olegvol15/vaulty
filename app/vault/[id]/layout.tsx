import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SideBar from "@/components/ui/sidebar";

export default async function VaultLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{id: string}>
}) {
  const {id} = await params;

  const vault = await prisma.vault.findUnique({
    where: {id},
    include: {
      notes: {
        orderBy: {
          updatedAt: "desc"
        }
      }
    }
  })

  if (!vault) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <aside className="w-72 border-r border-white/10 bg-neutral-900 px-4 py-5">
        <Link href="/" className="text-sm text-neutral-400 hover:text-white"> 
          Back to Vaults
        </Link>

        <div className="mt-6">
          <h1 className="text-lg font-semibold">{vault.name}</h1>

          {vault.description ? (
            <p className="mt-1 text-sm text-neutral-400">
              {vault.description}
            </p>
          ): null}
        </div>

        <nav className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Notes
          </p>

          {vault.notes.length > 0 ? (
            <ul className="space-y-1">
              {vault.notes.map((note) => (
                <li key={note.id}>
                  <Link href={`/vault/${vault.id}/note/${note.id}`} className="block rounded-md px-3 py-2 text-sm text-neutral-300 hover:bg-white/10 hover:text-white">
                  {note.title}
                </Link>
                </li>

              ))}
            </ul>
          ): (
            <p className="rounded-md border border-dashed border-white/10 px-3 py-4 text-sm text-neutral-500">
              No notes yet
            </p>
          )}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 px-8 py-6">
        {children}
      </main>
    </div>
  )
}
