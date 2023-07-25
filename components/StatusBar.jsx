import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function StatusBar({ operationsMade, player }) {
  const [playerScore, setPlayerScore] = useState(50);

  useEffect(() => {
    // -5 = 0, -4 = 10, -3 = 20, -2 = 30, -1 = 40, 0 = 50, 1 = 60, 2 = 70
    setPlayerScore(50 + operationsMade * 10);
  }, [operationsMade]);

  return (
    <Status>
      <div className="score">{operationsMade}/5</div>
      <div className="bar-container">
        <div
          className={`bar ${
            player === 1
              ? "first-player-score-glow"
              : "second-player-score-glow"
          }`}
          style={{ width: playerScore + "%" }}
        />
        <div
          className={`bar ${
            player === 1
              ? "second-player-score-normal"
              : "first-player-score-normal"
          }`}
          style={{ width: 100 - playerScore + "%" }}
        />
      </div>
    </Status>
  );
}

const Status = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin: 1rem;

  .score {
    width: 100%;
    text-align: end;
    user-select: none;
  }

  .bar-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    .bar {
      height: 10px;
    }

    .first-player-score-glow {
      background-color: rgb(91, 4, 250);
      box-shadow: inset 0px 0px 10px 2px rgba(91, 4, 250, 0.5),
        0px 0px 20px rgba(91, 4, 250, 0.5);
      -webkit-animation: pulseFirst 0.6s alternate infinite;
      @keyframes pulseFirst {
        0% {
          background: #9ab8f4;
          background-position: -100% 0;
          box-shadow: inset 0px 0px 10px 2px rgba(91, 4, 250, 0.5),
            0px 0px 40px 2px rgba(91, 4, 250, 1);
        }
        100% {
          background: rgb(65, 38, 218);
          background-position: 200% 0;
          box-shadow: inset 0px 0px 10px 2px rgba(93, 93, 178, 0.5),
            0px 0px 30px 2px rgba(105, 135, 255, 0.3);
        }
      }
    }

    .second-player-score-glow {
      background-color: rgb(242, 28, 72);
      box-shadow: inset 0px 0px 10px 2px rgba(242, 28, 72, 0.5),
        0px 0px 20px rgba(242, 28, 72, 0.5);
      -webkit-animation: pulseSecond 0.6s alternate infinite;
      @keyframes pulseSecond {
        0% {
          background: #f49a9a;
          background-position: -100% 0;
          box-shadow: inset 0px 0px 10px 2px rgba(242, 28, 72, 0.5),
            0px 0px 40px 2px rgba(242, 28, 72, 1);
        }
        100% {
          background: rgb(203, 55, 55);
          background-position: 200% 0;
          box-shadow: inset 0px 0px 10px 2px rgba(178, 93, 93, 0.5),
            0px 0px 30px 2px rgba(255, 105, 105, 0.3);
        }
      }
    }

    .first-player-score-normal {
      background-color: rgba(84, 36, 255, 0.998);
    }

    .second-player-score-normal {
      background-color: #f21c48;
    }
  }
  @media screen and (max-width: 700px) {
    width: 80%;
  }
`;
