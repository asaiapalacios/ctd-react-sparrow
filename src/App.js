import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
  // 1) Set initial state to an empty array upon component initialization
  const [todoList, setTodoList] = useState([]);
  // 2)
  const [isLoading, setIsLoading] = useState(true);
  // 3)
  // Upon component initialization (loading/refreshing page) and after simulating a 2 second loading request:
  // -result param receives item(s), array of objects, or nothing (b/c no item(s) stored in local storage yet)
  // -todoList updates from an empty array to current state + is displayed as list item(s); and
  // -isLoading state updates to false -> "Loading..." text is no longer rendered
  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            // getItem *reads* an object from local storage
            // JSON API transforms item(s) - JSON.parse() - from string to JavaScript object
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        });
      }, 2000);
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  // 6 & 9) After todoList state gets updated and isLoading is set to false, useEffect tracks when:
  // -there are changes to todoList (upon user typing in input field and submitting form);
  // -if there are changes to todoList state, then...
  useEffect(() => {
    if (!isLoading) {
      // *write*/save current state value in str format to browser local storage (sync state to storage)
      // note: JSON.stringify() transforms object into a string
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // 5) Update todoList
  // callback's parameter newTodo receives passed current state object: user input + unique no.
  const addTodo = (newTodo) => {
    console.log(newTodo);

    // Pass newTodo object to the state setter function
    // -> newTodo object (key:value pairs of title, id) appends to end of todoList array
    // -> todoList updates from a copy of previous state to current state via setter funct setTodoList
    setTodoList([...todoList, newTodo]);

    // note: App component currently displays PREVIOUS state when console log
    // console.log(todoList);
  };
  // now: App component re-renders to CURRENT state of array of objects when console log outside of addTodo
  console.log(todoList);

  // 8) Remove clicked item with passed todo.id argument (now id parameter)
  const removeTodo = (id) => {
    // For every item of the list, store new array of items to render if items meet truthy expression
    // If expression is false (if item.id does === id), the item(s) are removed + not included in new array
    const newList = todoList.filter((item) => item.id !== id);
    // Render, after exiting callback handler, a new array minus items filter() removed (b/c expression false)
    // Note: newList *IS* todoList
    setTodoList(newList);
  };

  return (
    // Insert fragment use when you don't want to introduce an element (div) to satisfy React rules
    <>
      <h1>Todo List</h1>
      {/* 4) AddTodoForm instance:
      -receives a passed object (current state of user input + unique no./id) after form is submitted
      -> reference to the handler function addTodo is now invoked, passing object as an argument */}
      <AddTodoForm onAddTodo={addTodo} />
      {/* 7) After passing todoList (array of objects) in its updated CURRENT form to TodoList component...
      -TodoList instance receives back:
        -> what user has typed & submitted in a <li> format, now ready to be rendered into React.DOM 
        -> todo.id, which a user wants removed (upon clicking the remove button); argument sent to handler */}

      {/* If isLoading is true, display "Loading..." text below form, otherwise, render stored listed items */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}

export default App;
