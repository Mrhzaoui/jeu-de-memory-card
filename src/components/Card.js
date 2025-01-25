import React from "react"

function Card({ symbol, isFlipped, onClick }) {
  return (
    <div className={`memory-card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="memory-card-inner">
        <div className="memory-card-front">{symbol}</div>
        <div className="memory-card-back">?</div>
      </div>
    </div>
  )
}

export default Card

