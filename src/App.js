import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Game from "./components/Game"
import Settings from "./components/Settings"
import History from "./components/History"
import Menu from "./components/Menu"
import "./styles/globals.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

