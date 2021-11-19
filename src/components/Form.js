import React,{ useState } from "react";


function Form(props){
  //状態を管理する？
  const [name, setName] = useState('');

  function handleSubmit(e) {
    if(name == ""){
      alert("文字ぐらい入力してくれたっていいじゃない");
      return;
    }
    e.preventDefault();
    props.addTask(name);
    setName("");
  }

  // near the top of the `Form` component
  function handleChange(e) {
    setName(e.target.value);
  }


    return(
    <form onSubmit= {handleSubmit}>
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
        <button 
        type="submit" 
        className="btn btn__primary btn__lg"
        >
          Add
        </button>
      </form>
    );
}

export default Form;

