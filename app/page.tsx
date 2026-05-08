import ExistingVaultCard from "@/components/vault/ExistingVaultCard";
import { prisma } from "@/lib/prisma";
import VaultyLogo from "@/components/ui/logo/logo";
import { Button } from "@chakra-ui/react";

export default async function Page() {
  const vaults = await prisma.vault.findMany({
    include: {
      _count: {
        select: {
          notes: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-12 text-white">
      <section className="flex w-full max-w-4xl flex-col items-center gap-8">
        <VaultyLogo className="h-auto w-48" />

        {vaults.length > 0 ? (
          <section className="grid w-full max-w-3xl justify-items-center gap-4 sm:grid-cols-2">
            {vaults.map((vault) => (
              <ExistingVaultCard
                key={vault.id}
                id={vault.id}
                name={vault.name}
                description={vault.description ?? undefined}
                noteCount={vault._count.notes}
                updatedAt={vault.updatedAt}
              />
            ))}
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-white">No vaults yet</h2>
            <p className="mt-2 text-sm text-neutral-400">
              Add a vault in the database, then refresh this page.
            </p>
          </section>
        )}

        <Button />
      </section>
    </main>
  );
}
