export default async function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-12 text-white">
      <section className="flex w-full max-w-4xl flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Vaulty</h1>
        <p className="text-lg text-neutral-400">
          Obsidian like note-taking app built with Next.js and Prisma.
        </p>
      </section>
    </main>
  )
}
