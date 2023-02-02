import { useState } from "react";
import "./gameInform.scss";

const GameInform = ({ setOpenInform }) => {
  const handleClick = () => {
    setOpenInform(false);
  };

  return (
    <div className="game__inform">
      GameInform
      <p> Ви грали як гость , то Ваші данні занесені в базу даних не будуть</p>
      <button onClick={handleClick}>X</button>
    </div>
  );
};

export default GameInform;
