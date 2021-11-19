import React, { useState } from "react";
import Todo from "./components/todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";

import { nanoid } from "nanoid";

//こっちは再レンダリングされた際にリセットされない
//すべてならば必ず真、そうでなければチェックボックスの状態によってかえるのだ。
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {



  //フィルターの状態
  const [filter, setFilter] = useState('All');

  function FilterButton(props) {
    return (
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
        <span className="visually-hidden">Show </span>
        <span>{props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }

  //タスクのトグルが押されたときボタン
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks[0])
  }

  //タスク削除ボタン
  function deleteTask(id) {
    //自身以外をリストに残す形で、自信を滅する
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  //タスク追加ボタン
  function addTask(name) {
    const newTask = { id: "id" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  //タスク編集ボタン
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //ここで状態を保存する
  const [tasks, setTasks] = useState(props.tasks);

  //上位存在からデータの一覧をtaskと言う名前で引っ張ってきた
  //フィルターに応じた者だけを表示するようにする
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        titlename={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  //フィルターの一覧表示。
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));


  //タスクの数を数えて、適切な文字を出すのだ
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >

        {taskList}

      </ul>
    </div>
  );
}

export default App;
