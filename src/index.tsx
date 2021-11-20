//index.jsがエントリーポイント、田き覚えた

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Task } from "./feature/task";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

//最初のデーター

const initialTasks: Task[] = [
  { id: "todo-0", name: "食べる", completed: true },
  { id: "todo-1", name: "寝るる！！", completed: false },
  { id: "todo-2", name: "学ぶる！！", completed: false },
];

ReactDOM.render(
  <StrictMode>
    <App tasks={initialTasks} />
  </StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();
