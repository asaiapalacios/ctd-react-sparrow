import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

// 2) Extract functionality as a reusable custom hook: synchronize local storage to React's state
const useSemiPersistentState = () => {
  // Make todo item(s) still visible after refreshing page (its default initial state) via...
  // getItem which *reads* an object from local storage
  // Note: use JSON API to transform (JSON.parse()) item(s) back from string to JavaScript object
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("savedTodoList"))
  );
  // *Write*/save to browser local storage the state value in str when todoList state changes
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

function App() {
  // 1) Call custom hook to return locally stored state and updater function
  const [todoList, setTodoList] = useSemiPersistentState();

  // 4) Callback's parameter newTodo receives passed obj -> current state of user input + unique no.
  let addTodo = (newTodo) => {
    console.log(newTodo);

    // Pass newTodo object to the state setter function
    // -> newTodo object (key:value pairs of title, id) appends to end of todoList array
    // -> todoList updates from a copy of prev state to current state via setter funct setTodoList
    setTodoList([...todoList, newTodo]);

    // Note: component currently displays PREVIOUS state
    // console.log(todoList);
  };
  // Note: component re-renders to CURRENT state of array of objects
  console.log(todoList);

  return (
    // Insert fragment use when you don't want to introduce an element (div) to satisfy React rules
    <>
      <h1>Todo List</h1>
      {/* 3) AddTodoForm instance:
      -receives a passed object (current state of user input + unique no.) after form is submitted
      -> reference to the handler function addTodo is now invoked, passing object as an argument */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* 5) After passing todoList state (array of objects) in its updated CURRENT form to <TodoList> comp...
      -TodoList instance receives back what user has typed & submitted in a a <li> format, 
      -> now ready to be rendered into React.DOM */}
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
