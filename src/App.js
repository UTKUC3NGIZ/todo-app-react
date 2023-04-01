import React, { useReducer } from "react";
import reducer from "./reducers/todoReducer";
import "./assets/css/reset.css";
import "./app.css";
import deneme from "./assets/images/icon-moon.svg";
import svgcarpi from "./assets/images/icon-cross.svg";
function App() {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    todo: "",
  });

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      todo: state.todo,
    });
  };

  const onChange = (e) => {
    dispatch({
      type: "SET_TODO",
      value: e.target.value,
    });
  };

  return (
    <>
      <div className="mainDiv">
        <div className="titleSection">
          <h1>TODO</h1>
          <span>
            <a href="">
              <img src={deneme} alt="" />
            </a>
          </span>
        </div>
        <div className="todoSection">
          <form className="addTodo" onSubmit={submitHandle}>
            <span className="addTodo__checkbox" type="checkbox"></span>

            <input
              className="addTodo__text"
              type="text"
              placeholder="Create a new todo..."
              value={state.todo}
              onChange={onChange}
            />
          </form>
          <div className="mainTodo">
            <ul>
              {state.todos.map((todo, index) => (
                <li key={index}>
                  <div className="todoInput">
                    <span
                      className="todoInput__checkbox"
                      type="checkbox"
                    ></span>
                    <span className="todoInput__text"> {todo}</span>
                    <img src={svgcarpi} alt="" className="todoInput__cross" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="todoSetting">
              <div>
                <p>5 items left</p>
                <div>
                  <button>All</button>
                  <button>Active</button>
                  <button>Completed</button>
                </div>
                <button>Clear Completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={submitHandle}>
        <input type="text" value={state.todo} onChange={onChange} />
        <button disabled={!state.todo}>Ekle</button>
      </form>
      <ul>
        {state.todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul> */}
    </>
  );
}

export default App;
