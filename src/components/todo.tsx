import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { usePrevious } from "../hooks/usePrevious";

type Props = {
  id: string;
  titlename: string;
  completed: boolean;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, newname: string) => void;
};

export default function Todo(props: Props) {
  //編集状態
  const [isEditing, setEditing] = useState(false);
  //タスクの名前
  const [newName, setNewName] = useState("");

  //選択状態
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  //前の状態が編集だったか否か
  const wasEditing = usePrevious(isEditing);

  //文字変わった時イベント
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  //決定イベント
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (newName === "") {
      alert("文字ぐらい入力してくれたっていいじゃない");
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  //編集状態と普通の状態で表示するリスト
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.titlename}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.titlename}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">
            new name for {props.titlename}
          </span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.titlename}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">{props.titlename}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete <span className="visually-hidden">{props.titlename}</span>
        </button>
      </div>
    </div>
  );

  //なにか起こったらこれが呼ばれそう(あとから？)
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [wasEditing, isEditing]);

  //こっちは必ず最初にRenderされる
  //console.log("main render");

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
