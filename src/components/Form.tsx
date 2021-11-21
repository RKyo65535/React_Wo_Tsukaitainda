import { ChangeEvent, FormEvent, useState } from "react";
import { Task } from "../feature/task";

type Props = {
  addTask: (taskname: string) => void;
};

function Form(props: Props) {
  //状態を管理する？
  const [name, setName] = useState<Task["name"]>("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (name === "") {
      alert("文字ぐらい入力してくれたっていいじゃない");
      return;
    }
    props.addTask(name);
    setName("");
  }

  // near the top of the `Form` component
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
