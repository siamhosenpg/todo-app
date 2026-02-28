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
        <div className="fixed inset-0 flex items-center justify-center bg-black/55 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <p>Are you sure?</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-2 py-1"
              >
                Yes
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 px-2 py-1"
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
