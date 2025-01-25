import React, { useState, useEffect, useCallback } from "react"
import Card from "./Card"

const CARD_SYMBOLS = ["🍎", "🍌", "🍒", "🍓", "🍊", "🍋", "🍍", "🥝", "🥑", "🍇", "🍉", "🍐", "🥭", "🍎", "🍏", "🍈"]

function Game() {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameStartTime, setGameStartTime] = useState(null)
  const [gameEndTime, setGameEndTime] = useState(null)

  const initializeGame = useCallback(() => {
    const gameSettings = JSON.parse(localStorage.getItem("gameSettings")) || {
      cardCount: 16,
      background: "bg-gray-100",
    }
    const shuffledCards = shuffleArray(CARD_SYMBOLS.slice(0, gameSettings.cardCount / 2)).concat(
      shuffleArray(CARD_SYMBOLS.slice(0, gameSettings.cardCount / 2)),
    )
    setCards(shuffledCards)
    setFlippedCards([])
    setMatchedCards([])
    setMoves(0)
    setGameStartTime(Date.now())
    setGameEndTime(null)
    document.body.className = gameSettings.background
  }, [])

  useEffect(() => {
    initializeGame()
  }, [initializeGame])

  const endGame = useCallback(() => {
    const endTime = Date.now()
    setGameEndTime(endTime)
    const duration = Math.floor((endTime - gameStartTime) / 1000)
    const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || []
    gameHistory.push({ moves, duration, date: new Date().toISOString() })
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory))
  }, [gameStartTime, moves])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      endGame()
    }
  }, [matchedCards, cards, endGame])

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)
    setMoves(moves + 1)

    if (newFlippedCards.length === 2) {
      if (cards[newFlippedCards[0]] === cards[newFlippedCards[1]]) {
        setMatchedCards([...matchedCards, ...newFlippedCards])
        setFlippedCards([])
      } else {
        setTimeout(() => setFlippedCards([]), 1000)
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Memory Card Game</h1>
            <div className="inline-block px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-800 font-semibold">Moves: {moves}</span>
            </div>
          </div>

          <div
            className={`grid gap-6 mx-auto w-fit
            ${cards.length === 4 ? "grid-cols-2" : cards.length === 16 ? "grid-cols-4" : "grid-cols-8"}`}
          >
            {cards.map((symbol, index) => (
              <Card
                key={index}
                symbol={symbol}
                isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>

          {gameEndTime && (
            <div className="mt-8 text-center">
              <div className="inline-block px-6 py-3 bg-green-100 rounded-full">
                <span className="text-green-800 font-semibold">
                  Game completed in {Math.floor((gameEndTime - gameStartTime) / 1000)} seconds!
                </span>
              </div>
            </div>
          )}

          <button
            className="mt-8 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={initializeGame}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default Game

