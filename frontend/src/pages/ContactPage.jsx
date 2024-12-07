import React, {useState, useEffect} from "react";
import {useChatStore} from "../store/useChatStore";
import {useAuthStore} from "../store/useAuthStore";
import {Verified} from "lucide-react";
import {useNavigate} from "react-router-dom";

const ContactPage = () => {
  const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading} = useChatStore();
  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  const searchedUsers = filteredUsers.filter((user) => user.fullName.toLowerCase().includes(searchQuery.toLowerCase())).sort((a, b) => b.verified - a.verified); // Sort by verification status (verified users first)

  if (isUsersLoading) return <div className="text-center text-zinc-500 py-4">Loading...</div>;

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate("/");
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-left">
            <h1 className="text-2xl font-semibold">Daftar Kontak</h1>
            <p className="mt-2 text-zinc-400">Saat ini, kontak yang tersedia adalah Global. Untuk private kontak sedang dalam perbaikan.</p>
          </div>

          {/* Search Input */}
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Search users by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-md bg-base-100 text-zinc-600 placeholder-zinc-400"
            />
          </div>

          <div className="space-y-6">
            {/* Online Only Toggle */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="show-online" checked={showOnlineOnly} onChange={() => setShowOnlineOnly((prev) => !prev)} className="toggle toggle-primary" />
              <label htmlFor="show-online" className="text-sm text-zinc-400">
                Show Online Only
              </label>
            </div>

            <div className="overflow-y-auto w-full py-3">
              {searchedUsers.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleUserClick(user)}
                  className={`w-full p-3 flex items-center gap-4 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                  <div className="relative">
                    <img src={user.profilePic || "/avatar.png"} alt={user.name} className="size-12 object-cover rounded-full" />
                    {onlineUsers.includes(user._id) && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />}
                  </div>

                  <div className="text-left min-w-0">
                    <div className="font-medium truncate flex items-center gap-2">
                      <span>{user.fullName}</span>
                      {user.verified && <Verified className="text-green-500" />}
                    </div>
                    <div className="text-sm text-zinc-400">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
                  </div>
                </button>
              ))}

              {searchedUsers.length === 0 && <div className="text-center text-zinc-500 py-4">No users found</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
