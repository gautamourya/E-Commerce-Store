"use client";

import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadUser } from "@/store/Reducer/userSlice";
import { asyncLogoutuser } from "@/store/actions/UserAction";
import { useEffect } from "react";

export default function UserMenu({ onClose }) {
  const dispatch = useDispatch();
  // use the correct slice key and guard against null
  const user = useSelector((state) => state.userReducer.user);
  const name = user?.name;

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    // Only hydrate redux from localStorage when store has no user
    if (storedName && !user) {
      dispatch(loadUser({ name: storedName }));
    }
  }, [dispatch, user]);


  const handleLogout = async () => {
    await dispatch(asyncLogoutuser());
    localStorage.removeItem("userName");
    onClose();
    window.location.href = "/";
  };

  return (
    <div
      className="
        absolute right-0 top-12 z-50 w-56
        rounded-xl bg-white shadow-lg border
        p-2
      "
    >
      {/* User info */}
      <div className="flex items-center gap-3 px-3 py-2 border-b">
        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <p className="text-sm font-semibold">{name || "Guest"}</p>
          {/* <p className="text-xs text-gray-500">Frontend Developer</p> */}
        </div>
      </div>

      {/* Menu items */}
      <div className="mt-1">
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>

        <Link
          href="/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
