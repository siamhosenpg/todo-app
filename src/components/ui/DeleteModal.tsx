"use client";

import { useState } from "react";
import { deleteTodo } from "@/app/actions/todoActions";
import { MdOutlineDelete } from "react-icons/md";

export default function DeleteModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await deleteTodo(id);
    setOpen(false);
    // you can also trigger router.refresh() if needed
  }

  return (
    <div className=" shrink-0">
      <button className="text-red-500" onClick={() => setOpen(true)}>
        <MdOutlineDelete className="text-xl" />
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className=" px-6 py-4 rounded shadow w-100 bg-background-secondary border border-border">
            <p>Are you sure delete this todo?</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 rounded-md text-white px-8 py-1 cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300/10 rounded-md px-8 py-1 cursor-pointer"
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
