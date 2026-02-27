"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-red-500">
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 space-y-4">
            <p>Are you sure?</p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1"
              >
                Yes
              </button>
              <button
                onClick={() => setOpen(false)}
                className="border px-3 py-1"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
