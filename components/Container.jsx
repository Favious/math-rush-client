import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calculator from "@/components/Calculator";
import StatusBar from "@/components/StatusBar";
import Operation from "@/components/Operation";
import operations from "../utils/operations";
import useSound from "use-sound";
import beepSound from "../utils/beep.mp3";

export default function Container() {
  const [answer, setAnswer] = useState(0);
  const [currentOperation, setCurrentOperation] = useState({});
  const [numbers, setNumbers] = useState([]);
  const [operationsMade, setOperationsMade] = useState(0);
  const [play] = useSound(beepSound);

  useEffect(() => {
    const numbers = [];
    for (let i = 0; i < 100; i++) {
      numbers.push(i);
    }
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setCurrentOperation(operations[numbers.shift()]);
    setNumbers(numbers);
  }, []);

  useEffect(() => {
    if (answer === currentOperation.answer) {
      let numbersCopy = numbers;
      setCurrentOperation(operations[numbersCopy.shift()]);
      setNumbers(numbersCopy);
      setAnswer(0);
      play();
      setOperationsMade(operationsMade + 1);
    }
  }, [answer]);

  function updateAnswer(newAnswer) {
    setAnswer(newAnswer);
  }

  return (
    <Section>
      <Operation operation={currentOperation} answer={answer} />
      <StatusBar operationsMade={operationsMade} />
      <Calculator
        currentOperation={currentOperation}
        updateAnswer={updateAnswer}
      />
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 60vh;
`;
