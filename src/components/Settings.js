import React, { useState, useEffect } from "react"

function Settings() {
  const [cardCount, setCardCount] = useState(16)
  const [background, setBackground] = useState("bg-gray-100")

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("gameSettings"))
    if (savedSettings) {
      setCardCount(savedSettings.cardCount)
      setBackground(savedSettings.background)
    }
  }, [])

  const saveSettings = () => {
    localStorage.setItem("gameSettings", JSON.stringify({ cardCount, background }))
    alert("Settings saved!")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Settings</h1>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Number of Cards:</label>
          <select
            value={cardCount}
            onChange={(e) => setCardCount(Number(e.target.value))}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={4}>4</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Background Color:</label>
          <select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bg-gray-100">Light Gray</option>
            <option value="bg-blue-100">Light Blue</option>
            <option value="bg-green-100">Light Green</option>
          </select>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default Settings

