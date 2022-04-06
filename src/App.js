import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  // Create a new state variable, newTodo, with its update function, setNewTodo
  // Tell React that newTodo is a state that changes over time; whenever it changes, React has to re-render its affected component(s)
  const [newTodo, setNewTodo] = React.useState("");

  // Invoke instances (2) of <AddTodoForm> and <TodoList> components
  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm onAddTodo={setNewTodo} />
      {/* Render newTodo value from AddTodoForm component */}
      <p>{newTodo}</p>

      <TodoList />
    </div>
  );
}

export default App;
