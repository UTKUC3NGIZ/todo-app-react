import "./assets/css/reset.css";
import "./app.css";
import "./assets/css/dark-mode.css";
import moon from "./assets/images/icon-moon.svg";
import checkImg from "./assets/images/icon-check.svg";
import crossImg from "./assets/images/icon-cross.svg";
import { useState } from "react";
function App() {
  const [todos, setTodos] = useState([
    { text: "todo 1", completed: true, id: 0 },
    { text: "todo 2", completed: true, id: 1 },
    { text: "todo 3", completed: false, id: 2 },
    { text: "todo 4", completed: false, id: 3 },
    { text: "todo 5", completed: false, id: 4 },
    { text: "todo 6", completed: false, id: 5 },
  ]);
  const [newTodo, setNewTodo] = useState("");

  function addTodo(e) {
    e.preventDefault();
    const newTodos = [
      ...todos,
      {
        text: `${newTodo}`,
        completed: false,
        id: parseInt(`${todos.length}`),
      },
    ];
    setTodos(newTodos);
    setNewTodo("");
  }

  const [filter, setFilter] = useState("all");

  const filteredTodos =
    filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : todos;

  function deleteTodos() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function changeTodo(index) {
    const newTodos = [...todos];
    if (newTodos[index].completed === false) {
      newTodos[index].completed = true;
    } else {
      newTodos[index].completed = false;
    }
    setTodos(newTodos);
  }

  function deleteTodo(index) {
    setTodos(todos.filter((todo) => todo.id !== index));
  }

  return (
    <>
      <div className="mainDiv">
        <div className="titleSection">
          <h1>TODO</h1>
          <span>
            <a href="">
              <img src={moon} alt="" />
            </a>
          </span>
        </div>
        <div className="todoSection">
          <form className="addTodo" onSubmit={addTodo}>
            <span className="addTodo__checkbox" type="checkbox"></span>
            <input
              className="addTodo__text"
              type="text"
              placeholder="Create a new todo..."
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
          </form>
          <div className="mainTodo">
            <ul>
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <div className="todoInput">
                    <span
                      className={
                        "todoInput__checkbox " +
                        (todo.completed ? "activeCheckButton" : "")
                      }
                      type="checkbox"
                      onClick={() => changeTodo(todo.id)}
                    >
                      <img src={checkImg} alt="" />
                    </span>

                    <span
                      className={
                        "todoInput__text " +
                        (todo.completed ? "activeCheckText" : "")
                      }
                      style={{
                        textDecoration: todo.completed ? "line-through" : "",
                      }}
                    >
                      {todo.text}
                    </span>
                    <img
                      src={crossImg}
                      alt=""
                      className="todoInput__cross"
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
            <div className="todoSetting">
              <div>
                <p>
                  {todos.filter((todo) => !todo.completed).length} items left
                </p>
                <div>
                  <button onClick={() => setFilter("all")}>All</button>
                  <button onClick={() => setFilter("active")}>Active</button>
                  <button onClick={() => setFilter("completed")}>
                    Completed
                  </button>
                </div>
                <button onClick={deleteTodos}>Clear Completed</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
