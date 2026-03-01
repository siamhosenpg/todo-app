"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/app/actions/todoActions";
import { MdOutlineDelete } from "react-icons/md";

export default function DeleteModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // spinner state
  const router = useRouter(); // router.refresh() use করার জন্য

  async function handleDelete() {
    try {
      setIsDeleting(true);
      await deleteTodo(id); // server action
      setOpen(false);
      router.refresh(); // ✅ server-rendered parts update হবে
    } catch (err) {
      alert("Failed to delete todo. Try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="shrink-0">
      <button
        className="text-red-500"
        onClick={() => setOpen(true)}
        title="Delete Todo"
      >
        <MdOutlineDelete className="text-xl" />
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70">
          <div className="px-6 py-4 rounded shadow w-100 bg-background-secondary border border-border">
            <p>Are you sure you want to delete this todo?</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-8 py-1 rounded-md text-white ${
                  isDeleting ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
                }`}
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
              <button
                onClick={() => setOpen(false)}
                disabled={isDeleting}
                className="bg-gray-300/10 rounded-md px-8 py-1"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
