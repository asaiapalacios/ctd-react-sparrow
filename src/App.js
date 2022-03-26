import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

// Invoke instances (2) of <AddTodoForm> and <TodoList> components in root <App> component
let App = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
};

export default App;
