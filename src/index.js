//index.jsがエントリーポイント、田き覚えた

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//最初のデーター
const DATA = [
  { id: "todo-0", name: "食べる！！", completed: true },
  { id: "todo-1", name: "寝るる！！", completed: false },
  { id: "todo-2", name: "学ぶる！！", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App subject="Clarice" tasks={DATA}/>
  </React.StrictMode>,
  document.getElementById('root')
);

