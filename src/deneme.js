// import React, { useState } from "react";

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [todo, setTodo] = useState();

//   const submitHandle = (e) => {
//     e.preventDefault();
//     setTodos([...todos, todo]);
//     setTodo("")
//   };

//   return (
//     <>
//       <h1>Todo App</h1>

//       <form onSubmit={submitHandle}>
//         <input
//           type="text"
//           value={todo}
//           onChange={(e) => setTodo(e.target.value)}
//         />
//         <button disabled={!todo}>Ekle</button>
//       </form>
//       <ul>
//         {todos.map((todo, index) => (
//           <li key={index}>{todo}</li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default App;