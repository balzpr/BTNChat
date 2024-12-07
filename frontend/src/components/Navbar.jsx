import React from "react";
import {useAuthStore} from "../store/useAuthStore";
import {Link, useLocation} from "react-router-dom";
import {Home, LogOut, MessageSquare, Settings, User, Users} from "lucide-react";

const Navbar = () => {
  const {logout, authUser} = useAuthStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Header */}
      <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h1 className="text-lg font-bold">BTN Chat</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2 hidden sm:flex">
              {authUser && (
                <>
                  <Link to="/" className={`btn btn-sm gap-2 ${isActive("/") ? "btn-primary" : ""}`}>
                    <Home className="size-5" />
                    <span className="hidden sm:inline">Beranda</span>
                  </Link>
                  <Link to="/profile" className={`btn btn-sm gap-2 ${isActive("/profile") ? "btn-primary" : ""}`}>
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profil</span>
                  </Link>

                  <Link to="/settings" className={`btn btn-sm gap-2 transition-colors ${isActive("/settings") ? "btn-primary" : ""}`}>
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Pengaturan</span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Footer */}
      <nav className="fixed bottom-0 left-0 right-0 bg-base-200 p-2 flex justify-around sm:hidden z-40">
        {authUser && (
          <>
            <Link to="/" className={`flex flex-col items-center text-sm ${isActive("/") ? "text-primary" : ""}`}>
              <Home className="w-5 h-5" />
              <span>Beranda</span>
            </Link>

            <Link to="/contacts" className={`flex flex-col items-center text-sm ${isActive("/contacts") ? "text-primary" : ""}`}>
              <Users className="w-5 h-5" />
              <span>Kontak Global</span>
            </Link>

            <Link to="/profile" className={`flex flex-col items-center text-sm ${isActive("/profile") ? "text-primary" : ""}`}>
              <User className="w-5 h-5" />
              <span>Profil</span>
            </Link>

            <Link to="/settings" className={`flex flex-col items-center text-sm ${isActive("/settings") ? "text-primary" : ""}`}>
              <Settings className="w-5 h-5" />
              <span>Pengaturan</span>
            </Link>
            
            <button className="flex flex-col items-center text-sm" onClick={logout}>
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
