import React from "react";
import "./FlashCard.css";

function FlashCard({ partyName, onVote }) {
  return (
    <div>
      <div className="flashcard">
      <div className="party-info">
        <i className="fa fa-key" style={{ fontSize: '24px' }}></i>
        <p className="party-name">Party</p>
      </div>
      <button onClick={onVote} className="vote-button">Vote<i class="fa fa-hand-o-left" style={{ fontSize: '24px' }}></i></button>
    </div>
    </div>
  );
}

export default FlashCard;
