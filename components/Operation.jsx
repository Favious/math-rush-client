import React, { useEffect } from "react";
import styled from "styled-components";

export default function Operation({ operation, answer }) {
  return (
    <Section>
      {operation &&
        operation.firstTerm &&
        `${operation.firstTerm} ${operation.operation} ${operation.secondTerm}`}{" "}
      =&nbsp;{answer !== 0 && `${answer}`}
      <div className="underscore">_</div>
    </Section>
  );
}

const Section = styled.div`
  margin-bottom: 1rem;
  border-radius: 0.6rem;
  border: 2px white solid;
  padding: 2rem;
  width: 40%;
  font-size: 3rem;
  user-select: none;
  display: flex;
  justify-content: center;
  .underscore {
    animation: blink 1s infinite linear;
    @keyframes blink {
      0% {
        color: rgba(0, 0, 0, 0);
      }
      49% {
        color: rgba(0, 0, 0, 0);
      }
      50% {
        color: #ffffff;
      }
      100% {
        color: #ffffff;
      }
    }
  }
  @media screen and (max-width: 700px) {
    padding: 1rem;
    font-size: 1.8rem;
    width: 80%;
  }
`;
