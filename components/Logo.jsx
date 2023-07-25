import React, { useRef, useEffect } from "react";
import styled from "styled-components";

export default function Logo() {
  const mathRushRef = useRef(null);
  const digits = "0123456789";

  const handleHover = () => {
    let iteration = 0;
    let interval = setInterval(() => {
      if (mathRushRef.current) {
        mathRushRef.current.innerText = mathRushRef.current.innerText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return mathRushRef.current.dataset.value[index];
            }
            return digits[Math.floor(Math.random() * 26) % 10];
          })
          .join("");
      }
      if (mathRushRef.current && mathRushRef.current.dataset.value) {
        if (iteration >= mathRushRef.current.dataset.value.length) {
          clearInterval(interval);
        }
      }

      iteration += 1 / 5;
    }, 30);
  };

  useEffect(() => {
    handleHover();
  }, []);

  useEffect(() => {
    if (mathRushRef.current) {
      mathRushRef.current.onmouseover = handleHover;
    }
  }, [mathRushRef]);

  return (
    <LogoLayout ref={mathRushRef} data-value="MATHRUSH">
      MATHRUSH
    </LogoLayout>
  );
}

const LogoLayout = styled.div`
  text-align: center;
  font-size: 6rem;
  user-select: none;
  margin-bottom: 1rem;
  @media screen and (max-width: 700px) {
    width: 100%;
    font-size: 4rem;
  }
`;
