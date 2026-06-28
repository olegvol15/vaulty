"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createVault() {
  const vault = await prisma.vault.create({
    data: {
      name: "Untitled Vault",
    },
  });

  revalidatePath("/");
  redirect(`/vault/${vault.id}`);
}
