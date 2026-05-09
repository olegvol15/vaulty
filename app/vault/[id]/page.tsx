import { LuFilePlus, LuFolderSearch, LuX } from "react-icons/lu";

export default function VaultPage() {
  return (
    <section className="flex min-h-full items-center justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="text-xl font-semibold text-white">No note selected</h1>

        <div className="mt-6 grid gap-2">
          <button
            type="button"
            className="flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm
  text-neutral-300 hover:bg-white/10 hover:text-white"
          >
            <LuFilePlus className="h-4 w-4 text-neutral-500" />
            <span>Create a note</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm
  text-neutral-300 hover:bg-white/10 hover:text-white"
          >
            <LuFolderSearch className="h-4 w-4 text-neutral-500" />
            <span>Go to file</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-md px-4 py-3 text-left text-sm
  text-neutral-300 hover:bg-white/10 hover:text-white"
          >
            <LuX className="h-4 w-4 text-neutral-500" />
            <span>Close</span>
          </button>
        </div>
      </div>
    </section>
  );
}
