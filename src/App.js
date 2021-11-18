import React from 'react';
import logo from './logo.svg';//画像をimportしてるっぽい
import './App.css';//CSSファイルをインポートしてるっぽい

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HelloWorld!!
        </p>

          Learn React
      </header>
    </div>
  );
}

export default App;
