"use client";

import { db } from "@/firebase";
import { closeEditProfileModal } from "@/redux/slices/modalSlice";
import { setUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface EditProfileModalProps {
  userInfo: DocumentData | null;
}

export default function EditProfileModal({ userInfo }: EditProfileModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const open = useSelector(
    (state: RootState) => state.modals.editProfileModalOpen
  );
  const user = useSelector((state: RootState) => state.user);
  const [newName, setNewName] = useState(userInfo?.name || "");
  const [newDescription, setNewDescription] = useState(
    userInfo?.description || ""
  );

  const handleSave = async () => {
    if (!userInfo) return;

    await updateDoc(doc(db, "user", user.uid), {
      name: newName,
      description: newDescription,
    });

    dispatch(setUser({ name: newName, uid: user.uid }));
    dispatch(closeEditProfileModal());
    router.refresh();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => dispatch(closeEditProfileModal())}
        className="flex items-center justify-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none relative">
          <XMarkIcon
            className="w-7 mt-5 ms-5 cursor-pointer"
            onClick={() => dispatch(closeEditProfileModal())}
          />
          <div className="p-12 flex flex-col space-y-4">
            <h1 className="text-3xl mb-2">Edit Profile</h1>
            <div className="flex flex-row space-x-4 items-center justify-start">
              <Image
                src="/profile-pic.jpg"
                width={70}
                height={70}
                alt="Profile picture"
                className="w-20 h-20 z-10 rounded-full"
              />
              <h3 className="text-xl">@username</h3>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Type your new name"
                className="flex-grow p-2 focus:border-button border-2 border-gray-300 rounded-lg outline-none transition"
              />
            </div>
            <textarea
              placeholder="Type your new description"
              className="p-2 focus:border-button border-2 border-gray-300 rounded-lg outline-none transition resize-none min-h-20"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
            <button
              className="bg-button text-white h-[48px] rounded-full shadow-md my-8 w-full font-bold"
              onClick={handleSave}
            >
              Save and Exit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
