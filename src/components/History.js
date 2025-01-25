import React, { useState, useEffect } from "react"

function History() {
  const [gameHistory, setGameHistory] = useState([])

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("gameHistory")) || []
    setGameHistory(history)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Game History</h1>
        {gameHistory.length === 0 ? (
          <p className="text-center text-gray-600">No games played yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Moves</th>
                <th className="px-4 py-2 text-left">Duration (s)</th>
              </tr>
            </thead>
            <tbody>
              {gameHistory.map((game, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="border px-4 py-2">{new Date(game.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{game.moves}</td>
                  <td className="border px-4 py-2">{game.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default History

