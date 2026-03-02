import React from "react";
import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <header className="bg-white p-8 text-2xl">
        <ul className="flex justify-between">
          <div>
            <li>NextStop</li>
          </div>
          <div className="flex gap-20">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/mybooking">My Bookings</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
        </ul>
      </header>

      <div className="flex-grow bg-[#f7f9fb]">
        <Outlet />
      </div>

      <footer className="bg-black p-2 text-white text-center">
        <p>© 2026 NextStop. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default MainLayout;