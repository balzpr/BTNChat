import React, {useEffect, useState} from "react";
import {useChatStore} from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import {Users, Verified} from "lucide-react";
import {useAuthStore} from "../store/useAuthStore";

const Sidebar = () => {
  const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`h-full fixed sm:static top-0 left-0 bg-base-100 z-40 border-r border-base-300 flex flex-col transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } w-64 sm:w-20 lg:w-72`}>
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Kontak (Global)</span>
          </div>
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input type="checkbox" checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)} className="checkbox checkbox-sm" />
              <span className="text-sm">Tampilkan hanya online</span>
            </label>
            <span className="text-xs text-zinc-500">({onlineUsers.length - 1}) Online</span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
              <div className="relative mx-auto lg:mx-0">
                <img src={user.profilePic || "/avatar.png"} alt={user.name} className="size-12 object-cover rounded-full" />
                {onlineUsers.includes(user._id) && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />}
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate flex items-center gap-2">
                  {user.fullName}
                  {user.verified && <Verified className="text-green-500" />}
                </div>
                <div className="text-sm text-zinc-400">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No online users</div>}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
