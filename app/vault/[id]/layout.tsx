import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VaultSidebar from "@/components/vault/VaultSidebar";

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
      <VaultSidebar vault={vault} />

      <main className="min-w-0 flex-1 bg-[#1e1e1e]">{children}</main>
    </div>
  );
}
