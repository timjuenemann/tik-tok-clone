import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import Screen from './components/Screen';
import * as smoothscroll from 'smoothscroll-polyfill';

export default function App() {
  // disable safari bounce
  document.ontouchmove = function (event) {
    event.preventDefault();
  };

  // mobile viewport fix
  const setViewport = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  window.onresize = function () {
    setViewport();
  };
  useLayoutEffect(() => {
    smoothscroll.polyfill();
    setViewport();
  });

  const [startApp, setStartApp] = useState(false);

  return (
    <div className="App">
      {startApp ? (
        <Screen />
      ) : (
        <div>
          <h1>TikTok Clone</h1>
          <button onClick={() => setStartApp(true)}>Start app</button>
        </div>
      )}
    </div>
  );
}
