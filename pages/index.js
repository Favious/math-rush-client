import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Logo from "@/components/Logo";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import styles from "@/styles/Home.module.css";
import styled from "styled-components";

export default function Home() {
  const [roomCode, setRoomCode] = useState("");

  return (
    <>
      <Head>
        <title>MATHRUSH</title>
        <meta
          name="description"
          content="Test your math skills against others!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.stars}></div>
        <div className={styles.stars2}></div>
        <div className={styles.stars3}></div>
        <Section>
          <Logo />
          <div className="selector">
            <div className="join">
              <input
                type="text"
                placeholder="Game code"
                onChange={(event) => setRoomCode(event.target.value)}
              />
              <Link
                href={`/play?roomCode=${roomCode}`}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button>Join game</button>
              </Link>
            </div>
            <div>OR</div>
            <Link
              href={`/play?roomCode=${randomCodeGenerator(5)}`}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button>Create game</button>
            </Link>
          </div>
        </Section>
      </main>
    </>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  /* font-family: var(--font-mono); */
  transform: rotatex(10deg);
  color: white;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .selector {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    user-select: none;
    font-size: 1.6rem;
  }

  .join {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      width: 250px;
      border-radius: 0.3rem;
      border: 2px solid white;
      background-color: transparent;

      color: white;
      font-size: 1.2rem;
      padding: 0.2rem 0.5rem;
    }
  }

  button {
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
  @media screen and (max-width: 700px) {
    .title {
      width: 100%;
      font-size: 4rem;
    }
    .selector {
      flex-direction: column;
      input {
        font-size: 1.3rem;
        width: 220px;
      }
    }
    button {
      width: 220px;
      font-size: 1.2rem;
      padding: 0.8em 1.2em;
    }
  }
`;
