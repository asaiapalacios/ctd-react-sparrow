import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

// 2) This reusable custom hook will synchronize local storage to React's state (else default)
const useSemiPersistentState = () => {
  // Make todo item(s) visible after loading/refreshing page (b/c they're stored in local storage)
  // If no initial state stored in local storage, default to an empty str upon comp initialization
  const [todoList, setTodoList] = useState(
    // getItem *reads* an object from local storage
    // JSON API transforms item(s) - JSON.parse() - back from string to JavaScript object
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );
  // *Write*/save state value in str format to browser local storage when todoList state changes
  // JSON.stringify() transforms object into a string
  useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

function App() {
  // 1) Call custom hook to return locally stored state and updater function
  const [todoList, setTodoList] = useSemiPersistentState();

  // 4) Callback's parameter newTodo receives passed obj: current state of user input + unique no.
  const addTodo = (newTodo) => {
    console.log(newTodo);

    // Pass newTodo object to the state setter function
    // -> newTodo object (key:value pairs of title, id) appends to end of todoList array
    // -> todoList updates from a copy of prev state to current state via setter funct setTodoList
    setTodoList([...todoList, newTodo]);

    // Below: component currently displays PREVIOUS state
    // console.log(todoList);
  };
  // Below: component now re-renders to CURRENT state of array of objects
  console.log(todoList);

  // 6) Remove clicked item with its id (passed from TodoListItem child component)
  const removeTodo = (id) => {
    // For every item of the list, store new array of items to render if items meet truthy expression
    // If expression is false (if item.id does === id), the item(s) are removed + not included in new array
    const newList = todoList.filter((item) => item.id !== id);
    // Render, after exiting callback handler, a new array minus items you removed (b/c expression false)
    // Note: newList *IS* todoList
    setTodoList(newList);
  };

  return (
    // Insert fragment use when you don't want to introduce an element (div) to satisfy React rules
    <>
      <h1>Todo List</h1>
      {/* 3) AddTodoForm instance:
      -receives a passed object (current state of user input + unique no./id) after form is submitted
      -> reference to the handler function addTodo is now invoked, passing object as an argument */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* 5) After passing todoList (array of objects) in its updated CURRENT form to TodoList comp...
      -TodoList instance receives back:
        -> what user has typed & submitted in a <li> format, now ready to be rendered into React.DOM 
        -> argument, todo.id, user wishes to remove (upon clicking the remove button); arg sent to handler */}
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;
