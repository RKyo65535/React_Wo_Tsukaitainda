import { useState, useRef, useEffect } from "react";
import Todo from "./components/todo";
import { FilterButton } from "./components/FilterButton";
import Form from "./components/Form";
import { Task } from "./feature/task";
import { FilterName } from "./feature/filter";

import { nanoid } from "nanoid";
import { usePrevious } from "./hooks/usePrevious";

//こっちは再レンダリングされた際にリセットされない
//すべてならば必ず真、そうでなければチェックボックスの状態によってかえるのだ。
const FILTER_MAP: { [K in FilterName]: (task: Task) => boolean } = {
  ALL: () => true,
  ACTIVE: (task) => !task.completed,
  COMPLETED: (task) => task.completed,
};

// FILTER_MAP がこの値なのが確定なので
const FILTER_NAMES = Object.keys(FILTER_MAP) as FilterName[];

type Props = {
  tasks: Task[];
};

function App(props: Props) {
  //現在の参照先
  const listHeadingRef = useRef<HTMLHeadingElement>(null);

  //フィルターの状態
  const [filter, setFilter] = useState<FilterName>("ALL");
  //task state
  const [tasks, setTasks] = useState<Task[]>(props.tasks);

  //タスクのトグルが押されたときボタン
  function toggleTaskCompleted(id: Task["id"]) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks[0]);
  }

  //タスク削除ボタン
  function deleteTask(id: Task["id"]) {
    //自身以外をリストに残す形で、自信を滅する
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  //タスク追加ボタン
  function addTask(name: Task["name"]) {
    const newTask: Task = { id: "id" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  //タスク編集ボタン
  function editTask(id: Task["id"], newName: string) {
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //上位存在からデータの一覧をtaskと言う名前で引っ張ってきた
  //フィルターに応じた者だけを表示するようにする
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
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
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  //タスクの数を数えて、適切な文字を出すのだ
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  //前状態のリストの長さをゲット
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
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
