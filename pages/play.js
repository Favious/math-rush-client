import React, { use, useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Calculator from "@/components/Calculator";
import StatusBar from "@/components/StatusBar";
import Operation from "@/components/Operation";
import operations from "../utils/operations";
import useSound from "use-sound";
import beepSound from "../utils/beep.mp3";

let socket;
//const ENDPOINT = "http://localhost:8000";
const ENDPOINT = "wss://amethyst-spiny-spear.glitch.me/";

export default function Game(props) {
  const router = useRouter();
  const { roomCode } = router.query;

  //initialize socket state
  const [room, setRoom] = useState(roomCode);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  //Player 1 states
  const [playerOneAnswer, setPlayerOneAnswer] = useState(0);
  const [playerOneOperationsMade, setPlayerOneOperationsMade] = useState(0);

  //Player 2 states
  const [playerTwoAnswer, setPlayerTwoAnswer] = useState(0);
  const [playerTwoOperationsMade, setPlayerTwoOperationsMade] = useState(0);

  //Game states

  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
      headers: {
        "user-agent": "Mozilla",
      },
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit("join", { room: room }, (error) => {
      if (error) setRoomFull(true);
    });

    //cleanup on component unmount
    return function cleanup() {
      socket.emit("clientDisconnect");
      //shut down connnection instance
      socket.off();
    };
  }, []);

  //initialize game state
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [currentOperation, setCurrentOperation] = useState({});
  const [numbers, setNumbers] = useState([]);
  const [play] = useSound(beepSound);

  useEffect(() => {
    socket.on("initGameState", ({ gameOver, currentOperation, numbers }) => {
      setGameOver(gameOver);
      setCurrentOperation(currentOperation);
      setNumbers(numbers);
      setPlayerOneOperationsMade(0);
      setPlayerTwoOperationsMade(0);
    });
    socket.on(
      "updateGameState",
      ({
        winner,
        gameOver,
        currentOperation,
        numbers,
        playerOneOperationsMade,
        playerTwoOperationsMade,
      }) => {
        winner && setWinner(winner);
        gameOver && setGameOver(gameOver);
        currentOperation && setCurrentOperation(currentOperation);
        numbers && setNumbers(numbers);
        playerOneOperationsMade &&
          setPlayerOneOperationsMade(playerOneOperationsMade);
        playerTwoOperationsMade &&
          setPlayerTwoOperationsMade(playerTwoOperationsMade);
      }
    );
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
    socket.on("currentUserData", ({ name }) => {
      setCurrentUser(name);
    });
  }, []);

  //runs once on component mount
  useEffect(() => {
    const numbers = [];
    for (let i = 0; i < 100; i++) {
      numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    let number = numbers.shift();
    setCurrentOperation(operations[number]);
    setNumbers(numbers);

    socket.emit("initGameState", {
      gameOver: false,
      currentOperation: operations[number],
      numbers: numbers,
    });
  }, []);

  //some util functions

  const checkGameOver = (operationsMade) => {
    return operationsMade === 5;
  };

  const checkWinner = (operationsMade, player) => {
    return operationsMade === 5 ? player : "";
  };

  useEffect(() => {
    if (currentOperation) {
      if (playerOneAnswer === currentOperation.answer) {
        let numbersCopy = [...numbers];
        setNumbers(numbersCopy);
        setPlayerOneAnswer(0);
        play();
        setPlayerTwoAnswer(0);
        console.log("player one answered");
        console.log(playerTwoOperationsMade + "pls");
        socket.emit("updateGameState", {
          winner: checkWinner(playerOneOperationsMade + 1, "Player 1"),
          gameOver: checkGameOver(playerOneOperationsMade + 1),
          currentOperation: operations[numbersCopy.shift()],
          numbers: numbersCopy,
          playerOneOperationsMade: playerOneOperationsMade + 1,
          playerTwoOperationsMade: playerTwoOperationsMade - 1,
        });
      } else if (playerTwoAnswer === currentOperation.answer) {
        let numbersCopy = [...numbers];
        setNumbers(numbersCopy);
        setPlayerTwoAnswer(0);
        play();
        setPlayerOneAnswer(0);
        console.log("player two answered");
        socket.emit("updateGameState", {
          winner: checkWinner(playerTwoOperationsMade + 1, "Player 2"),
          gameOver: checkGameOver(playerTwoOperationsMade + 1),
          currentOperation: operations[numbersCopy.shift()],
          numbers: numbersCopy,
          playerOneOperationsMade: playerOneOperationsMade - 1,
          playerTwoOperationsMade: playerTwoOperationsMade + 1,
        });
      }
    }
  }, [playerOneAnswer, playerTwoAnswer]);

  function updatePlayerOneAnswer(newAnswer) {
    setPlayerOneAnswer(newAnswer);
  }

  function updatePlayerTwoAnswer(newAnswer) {
    setPlayerTwoAnswer(newAnswer);
  }

  return (
    <>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>
      <GameLayout>
        {!roomFull ? (
          <>
            {users.length !== 2 && (
              <div className="game-code">
                <h1>
                  Game code:
                  <span style={{ userSelect: "text" }}> {room}</span>
                </h1>
                {/* <h1>
              Share game link {`http://localhost:3000/play?roomCode=${room}`}
            </h1> */}
              </div>
            )}

            {/* PLAYER LEFT MESSAGES */}
            {users.length === 1 && currentUser === "Player 2" && (
              <h1 className="waiting-message">Player 1 has left the game.</h1>
            )}
            {users.length === 1 && currentUser === "Player 1" && (
              <h1 className="waiting-message">
                Waiting for Player 2 to join the game...
              </h1>
            )}
            {users.length === 2 && (
              <>
                {gameOver ? (
                  <div>
                    {winner !== "" && (
                      <>
                        <h1>GAME OVER</h1>
                        <h2>{winner} wins!</h2>
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    {/* PLAYER 1 VIEW */}
                    {currentUser === "Player 1" && (
                      <div className="container">
                        <Operation
                          operation={currentOperation}
                          answer={playerOneAnswer}
                        />
                        <StatusBar
                          operationsMade={playerOneOperationsMade}
                          player={1}
                        />
                        <Calculator
                          currentOperation={currentOperation}
                          updateAnswer={updatePlayerOneAnswer}
                        />
                      </div>
                    )}
                    {/* PLAYER 2 VIEW */}
                    {currentUser === "Player 2" && (
                      <div className="container">
                        <Operation
                          operation={currentOperation}
                          answer={playerTwoAnswer}
                        />
                        <StatusBar
                          operationsMade={playerTwoOperationsMade}
                          player={2}
                        />
                        <Calculator
                          currentOperation={currentOperation}
                          updateAnswer={updatePlayerTwoAnswer}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <h1>Room full</h1>
        )}

        <br />
        <a href="/">
          <button className="quit-button">QUIT</button>
        </a>
      </GameLayout>
    </>
  );
}

const GameLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  color: white;

  .game-code {
    margin: 2rem;
  }

  h1 {
    user-select: none;
  }

  .waiting-message {
    margin: 1rem;
    font-size: 1.5rem;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 60vh;
  }

  .quit-button {
    display: block;
    position: relative;
    margin: 0.5em 0;
    padding: 0.8em 2.2em;
    width: 250px;
    cursor: pointer;

    background: #ffffff;
    border: none;
    border-radius: 0.4em;
    color: black;
    text-transform: uppercase;
    font-size: 1rem;
    font-family: "Work Sans", sans-serif;
    font-weight: 500;
    letter-spacing: 0.04em;

    mix-blend-mode: color-dodge;
    perspective: 500px;
    transform-style: preserve-3d;

    &:before,
    &:after {
      --z: 0px;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      opacity: 0;
      mix-blend-mode: inherit;
      border-radius: inherit;
      transform-style: preserve-3d;
      transform: translate3d(
        calc(var(--z) * 0px),
        calc(var(--z) * 0px),
        calc(var(--z) * 0px)
      );
    }

    span {
      mix-blend-mode: none;
      display: block;
    }

    &:after {
      background-color: #5d00ff;
    }

    &:before {
      background-color: #ff1731;
    }

    &:hover {
      background-color: #fff65b;
      transition: background 0.3s 0.1s;
    }

    &:hover:before {
      --z: 0.02;
      animation: translateWobble 2.2s ease forwards;
    }

    &:hover:after {
      --z: -0.035;
      animation: translateWobble 2.2s ease forwards;
    }
  }

  @keyframes translateWobble {
    0% {
      opacity: 0;
      transform: translate3d(
        calc(var(--z) * 0px),
        calc(var(--z) * 0px),
        calc(var(--z) * 0px)
      );
    }
    16% {
      transform: translate3d(
        calc(var(--z) * 160px),
        calc(var(--z) * 160px),
        calc(var(--z) * 160px)
      );
    }
    28% {
      opacity: 1;
      transform: translate3d(
        calc(var(--z) * 70px),
        calc(var(--z) * 70px),
        calc(var(--z) * 70px)
      );
    }
    44% {
      transform: translate3d(
        calc(var(--z) * 130px),
        calc(var(--z) * 130px),
        calc(var(--z) * 130px)
      );
    }
    59% {
      transform: translate3d(
        calc(var(--z) * 85px),
        calc(var(--z) * 85px),
        calc(var(--z) * 85px)
      );
    }
    73% {
      transform: translate3d(
        calc(var(--z) * 110px),
        calc(var(--z) * 110px),
        calc(var(--z) * 110px)
      );
    }
    88% {
      opacity: 1;
      transform: translate3d(
        calc(var(--z) * 90px),
        calc(var(--z) * 90px),
        calc(var(--z) * 90px)
      );
    }
    100% {
      opacity: 1;
      transform: translate3d(
        calc(var(--z) * 100px),
        calc(var(--z) * 100px),
        calc(var(--z) * 100px)
      );
    }
  }
`;
