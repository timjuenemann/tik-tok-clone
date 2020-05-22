import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import Screen from './components/Screen';
// @ts-ignore
import * as smoothscroll from 'smoothscroll-polyfill';

function App() {
  const [startApp, setStartApp] = useState(false);

  // disable safari bounce
  document.ontouchmove = function (event) {
    event.preventDefault();
  };

  const setViewport = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.onresize = function () {
    console.log('resize');
    setViewport();
  };

  useLayoutEffect(() => {
    smoothscroll.polyfill();
    setViewport();
  }, []);

  return (
    <div className="App">
      {startApp ? (
        <Screen />
      ) : (
        <div>
          <h1>TikTok Clone</h1>
          <button onClick={() => setStartApp(true)}>Start</button>
        </div>
      )}
    </div>
  );
}

export default App;
