import React from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type={"primary"}>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </Button>
      </header>
    </div>
  );
}

export default App;
