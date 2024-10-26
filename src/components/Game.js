import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles/game.css";
import img1 from "./images/player1.png";
import img2 from "./images/player2.png";

export default function Game() {
  const location = useLocation();
  const { player1, player2, number, starter } = location.state || {};
  const [turn, setTurn] = useState(player1);
  const [playerImg, setPlayerImg] = useState(img1);
  const [board, setBoard] = useState(Array(42).fill(null));
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ [player1]: 0, [player2]: 0 });
  const [currentRound, setCurrentRound] = useState(1);
  const [roundMessage, setRoundMessage] = useState(
    `Playing Round ${currentRound} of ${number}`
  );
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [tournamentWon, setTournamentWon] = useState(false);
  const [tournamentDraw, setTournamentDraw] = useState(false);
  const [lastRoundWinner, setLastRoundWinner] = useState(null); 

  const changeTurn = () => {
    if (turn === player1) {
      setTurn(player2);
      setPlayerImg(img2);
    } else {
      setTurn(player1);
      setPlayerImg(img1);
    }
  };

  const checkWin = (newBoard) => {
    const winningCombinations = [
      
      ...Array.from({ length: 6 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => [
          row * 7 + col,
          row * 7 + col + 1,
          row * 7 + col + 2,
          row * 7 + col + 3,
        ])
      ).flat(),
      
      ...Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => [
          row * 7 + col,
          (row + 1) * 7 + col,
          (row + 2) * 7 + col,
          (row + 3) * 7 + col,
        ])
      ).flat(),
      
      ...Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => [
          row * 7 + col,
          (row + 1) * 7 + col + 1,
          (row + 2) * 7 + col + 2,
          (row + 3) * 7 + col + 3,
        ])
      ).flat(),
      
      ...Array.from({ length: 3 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => [
          (row + 3) * 7 + col,
          (row + 2) * 7 + col + 1,
          (row + 1) * 7 + col + 2,
          row * 7 + col + 3,
        ])
      ).flat(),
    ];

    for (let combination of winningCombinations) {
      const [a, b, c, d] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c] &&
        newBoard[a] === newBoard[d]
      ) {
        return newBoard[a];
      }
    }

    return null;
  };

  const handleCircleClick = (index) => {
    if (board[index] || winner || roundCompleted || tournamentWon || tournamentDraw) return;

    setHistory([...history, board]);
    const newBoard = board.slice();
    newBoard[index] = playerImg;
    setBoard(newBoard);

    const winningPlayer = checkWin(newBoard);
    if (winningPlayer) {
      setWinner(winningPlayer);
      setScores((prevScores) => {
        const updatedScores = {
          ...prevScores,
          [turn]: prevScores[turn] + 1,
        };

        if (currentRound >= number) {
          if (updatedScores[player1] === updatedScores[player2]) {
            setTournamentDraw(true);
            setRoundMessage("");
            setShowCongrats(true);
          } else {
            const overallWinner =
              updatedScores[player1] > updatedScores[player2]
                ? player1
                : player2;
            setRoundMessage(`${overallWinner}, You Won the Tournament!`);
            setTournamentWon(true);
          }
        }

        return updatedScores;
      });

      setLastRoundWinner(turn);
      setRoundMessage(`${turn}, You won Game ${currentRound}!`);
      setRoundCompleted(true);
      setShowCongrats(true);
      return;
    }

    changeTurn();
  };

  const determineStarter = () => {
    switch (starter) {
      case "Alternative Turn":
        setTurn(currentRound % 2 === 0 ? player2 : player1);
        setPlayerImg(currentRound % 2 === 0 ? img2 : img1);
        break;
      case "Looser First":
        setTurn(lastRoundWinner === player1 ? player2 : player1);
        setPlayerImg(lastRoundWinner === player1 ? img2 : img1);
        break;
      case "Winner First":
        setTurn(lastRoundWinner || player1); 
        setPlayerImg(lastRoundWinner === player1 ? img1 : img2);
        break;
      case "Always player 01":
        setTurn(player1);
        setPlayerImg(img1);
        break;
      case "Always player 02":
        setTurn(player2);
        setPlayerImg(img2);
        break;
      default:
        setTurn(player1);  
        setPlayerImg(img1);
    }
  };

  const handleNextGame = () => {
    if (currentRound < number) {
      setCurrentRound(currentRound + 1);
      setRoundMessage(`Playing Round ${currentRound + 1} of ${number}`);
      setBoard(Array(42).fill(null));
      setWinner(null);
      setRoundCompleted(false);
      setShowCongrats(false);
      determineStarter();
    }
  };

  const handleUndo = () => {
    if (roundCompleted) {
      handleNextGame();
      return;
    }
    if (history.length === 0) return;
    const lastBoard = history.pop();
    setBoard(lastBoard);
    setHistory([...history]);
    setPlayerImg(turn === player1 ? img1 : img2);
    changeTurn();
  };

  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setHistory([]);
    setWinner(null);
    setCurrentRound(1);
    setScores({ [player1]: 0, [player2]: 0 });
    setTurn(player1);
    setPlayerImg(img1);
    setRoundMessage(`Playing Round 1 of ${number}`);
    setRoundCompleted(false);
    setShowCongrats(false);
    setTournamentWon(false);
    setTournamentDraw(false);
    setLastRoundWinner(null);
    determineStarter(); 
  };

  return (
    <div>
      <Navbar back={"/twoPlayer"} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="game  animate__animated animate__zoomIn">
          <div className="board">
            <div className="main_board">
              {board.map((circle, index) => (
                <div
                  key={index}
                  className="sub_board"
                  onClick={() => handleCircleClick(index)}
                >
                  <div className="circle">
                    {circle ? <img src={circle} alt="" /> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="info">
            <p className="head">{number} Games Tournament</p>

            {showCongrats && (
              <p className="congrats">
                {tournamentDraw ? "Tournament Draw!" : "Congratulations!"}
              </p>
            )}
            {roundMessage && <p className="tag">{roundMessage}</p>}
            <div className="participant" style={{ backgroundColor: "#e4f4e0" }}>
              <img
                className={turn === player1 ? "current_turn" : ""}
                src={img1}
                alt=""
              />
              <div>
                <p>Player 01</p>
                <p className="name">{player1}</p>
              </div>
              <div className="score">
                <p>Score</p>
                <p>{scores[player1]}</p>
              </div>
            </div>
            <div className="participant" style={{ backgroundColor: "#f7e8d1" }}>
              <img
                className={turn === player2 ? "current_turn" : ""}
                src={img2}
                alt=""
              />
              <div>
                <p>Player 02</p>
                <p className="name">{player2}</p>
              </div>
              <div className="score">
                <p>Score</p>
                <p>{scores[player2]}</p>
              </div>
            </div>
            <hr
              style={{
                marginTop: "25px",
                border: "1px solid black",
                width: "90%",
              }}
            />
            {!tournamentWon && !tournamentDraw && (
              <button
                className="bttn"
                onClick={handleUndo}
                style={{
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#0080ff",
                }}
              >
                {roundCompleted ? "Next Game" : "Undo Step"}
              </button>
            )}
            <button
              className="bttn"
              onClick={resetGame}
              style={{
                cursor: "pointer",
                color: "#0080ff",
                backgroundColor: "white",
              }}
            >
              {tournamentWon || tournamentDraw ? "Play Again" : "End Tournament"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
