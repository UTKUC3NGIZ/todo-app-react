import "./assets/css/reset.css";
import "./assets/css/app.css";
import "./assets/css/dark-mode.css";
import moon from "./assets/images/icon-moon.svg";
import sun from "./assets/images/icon-sun.svg";
import checkImg from "./assets/images/icon-check.svg";
import crossImg from "./assets/images/icon-cross.svg";
import { useEffect, useState } from "react";
function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
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

  const [isDarkMode, setIsDarkMode] = useState(false);

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    // const storedTodos = JSON.parse(localStorage.getItem("todos"));
    // if (storedTodos) {
    //   setTodos(storedTodos);
    // }
    const storedTheme = JSON.parse(localStorage.getItem("theme"));
    if (storedTheme) {
      setIsDarkMode(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <div className={"background " + (isDarkMode ? "backgroundDark" : "")}>
      <div className="mainDiv">
        <div className="titleSection">
          <h1>TODO</h1>
          <span onClick={toggleDarkMode}>
            <img src={isDarkMode ? sun : moon} alt="" />
          </span>
        </div>
        <div className="todoSection">
          <form
            className={"addTodo " + (isDarkMode ? "dark" : "")}
            onSubmit={addTodo}
          >
            <span className="addTodo__checkbox" type="checkbox"></span>
            <input
              className={"addTodo__text " + (isDarkMode ? "dark" : "")}
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
                  <div className={"todoInput " + (isDarkMode ? "dark" : "")}>
                    <span
                      className={
                        "todoInput__checkbox " +
                        (todo.completed ? "activeCheckButton " : "") +
                        (isDarkMode && !todo.completed ? "darkCheckBox" : "")
                      }
                      type="checkbox"
                      onClick={() => changeTodo(todo.id)}
                    >
                      <img src={checkImg} alt="" />
                    </span>

                    <span
                      className={
                        "todoInput__text " +
                        (todo.completed ? "activeCheckText " : "") +
                        (isDarkMode ? "dark" : "")
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
            <div className={"todoSetting " + (isDarkMode ? "dark" : "")}>
              <div className={isDarkMode ? "darkButton" : ""}>
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
    </div>
  );
}

export default App;
