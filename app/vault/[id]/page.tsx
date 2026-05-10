import { LuArrowLeft, LuFilePlus } from "react-icons/lu";

export default function VaultPage() {
  return (
    <section className="flex min-h-screen items-center justify-center px-8 text-neutral-100">
      <div className="w-full max-w-md rounded-lg border border-[#303030] bg-[#232323] px-8 py-7 shadow-2xl shadow-black/20">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-neutral-400">
            <LuFilePlus className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-neutral-100">
              No note selected
            </h1>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Choose a note from the sidebar, or use the compose button in the
              file list to create a new untitled note.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-md bg-black/20 px-3 py-2 text-xs text-neutral-500">
          <LuArrowLeft className="h-4 w-4" />
          Files are listed in the left sidebar
        </div>
      </div>
    </section>
  );
}
