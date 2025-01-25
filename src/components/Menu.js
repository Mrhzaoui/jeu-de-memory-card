import React from "react"
import { Link, useLocation } from "react-router-dom"

function Menu() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "bg-white/10" : ""
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${isActive("/")}`}>
              Game
            </Link>
            <Link
              to="/settings"
              className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${isActive("/settings")}`}
            >
              Settings
            </Link>
            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${isActive("/history")}`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu

