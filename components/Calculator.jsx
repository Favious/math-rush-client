import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Calculator({ currentOperation, updateAnswer }) {
  const [answer, setAnswer] = useState(0);

  useEffect(() => updateAnswer(answer), [answer]);

  useEffect(() => {
    setAnswer(0);
  }, [currentOperation]);

  function addNumberToAnswer(number) {
    if (answer === 0) {
      setAnswer(number);
    } else if (number === -1) {
      setAnswer(Math.floor(answer / 10));
    } else {
      setAnswer(answer * 10 + number);
    }
  }

  return (
    <Calc>
      <button onClick={() => addNumberToAnswer(1)}>1</button>
      <button onClick={() => addNumberToAnswer(2)}>2</button>
      <button onClick={() => addNumberToAnswer(3)}>3</button>
      <button onClick={() => addNumberToAnswer(4)}>4</button>
      <button onClick={() => addNumberToAnswer(5)}>5</button>
      <button onClick={() => addNumberToAnswer(6)}>6</button>
      <button onClick={() => addNumberToAnswer(7)}>7</button>
      <button onClick={() => addNumberToAnswer(8)}>8</button>
      <button onClick={() => addNumberToAnswer(9)}>9</button>
      <button onClick={() => addNumberToAnswer(0)}>0</button>
      <button onClick={() => addNumberToAnswer(-1)} disabled={answer === 0}>
        {"<-"}
      </button>
    </Calc>
  );
}

const Calc = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 40%;
  gap: 0.5rem;
  font-family: var(--font-space);
  button {
    font-size: 1.4rem;
    flex: 1 1 30%;
    padding: 0.7rem;
    user-select: none;
    color: white;
    background: #6b6b6b;
    border-radius: 0.6rem;
    border: none;
    position: relative;
    &:hover {
      background: #848484;
    }
  }

  @media screen and (max-width: 700px) {
    width: 80%;
    button {
      flex: 1 1 30%;
    }
  }
`;
