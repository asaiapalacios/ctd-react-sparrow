import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  // A place to store (todoTitle state) what user types in input field; initially empty
  const [todoTitle, setTodoTitle] = useState("");

  // 2) todoTitle state gets updated (initally an empty string):
  // -> state will store current value user typed in input field
  let handleTitleChange = (e) => {
    // console.log(e);
    // Retrieve user's input field value (text typed)
    let newTodoTitle = e.target.value;
    // Update state -> newTodoTitle *IS* todoTitle
    setTodoTitle(newTodoTitle);
  };
  // todoTitle state now updated to current state
  console.log(todoTitle);

  // 5) Goal: pass object (current state of user input + unique no.) to <AddTodoForm />
  let handleAddTodo = (e) => {
    // Prevent the browser from executing the default behavior of the form submit
    // i.e., form won't be sent to another location & page won't be refreshed
    e.preventDefault();
    // Pass object to <AddTodoForm /> in App component (onAddTodo *IS* addTodo handler func reference)
    onAddTodo({
      title: todoTitle,
      id: Date.now(),
    });
    // Reset todoTitle state to an empty string (to clear value) each time user submits form
    setTodoTitle("");
  };

  return (
    // 4) When user SUBMITS a typed input, an (e) obj is passed to handler func reference handleAddTodo
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        // 3) Typed value coming from updated state (controlled input, our "one source of truth")...
        //    as opposed to value coming from input element's native behavior
        value={todoTitle}
        // 1) User TYPES into input field -> (e) obj is created -> (e) is passed to handler func reference
        onChange={handleTitleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
