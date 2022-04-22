import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  const [todoList, setTodoList] = React.useState([]);
  // B) Callback's parameter newTodo receives passed obj -> current state of user input + unique no.
  let addTodo = (newTodo) => {
    console.log(newTodo);

    // Pass newTodo object to the state setter function
    // -> newTodo object (key:value pairs of title, id) appends to end of todoList array
    // -> todoList updates from a copy of prev state to current state via setter funct setTodoList
    setTodoList([...todoList, newTodo]);

    // Note: component currently displays PREVIOUS state
    // console.log(todoList);
  };
  // Note: component re-renders to CURRENT state
  console.log(todoList);

  return (
    <div>
      <h1>Todo List</h1>
      {/* A) AddTodoForm instance:
      -receives a passed object (current state of user input + unique no.) after form is submitted
      ->reference to the handler function addTodo is now invoked, passing object as an argument */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* C) After passing todoList state in its updated CURRENT form to <TodoList> component...
      -TodoList instance receives back what user has typed & submitted in a a <li> format, 
      ->now ready to be rendered to React.DOM */}
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
