import React from "react";

const todoList = [
  {
    id: 1,
    title: "Complete assignment",
  },
  {
    id: 2,
    title: "Eat yummy food",
  },
  {
    id: 3,
    title: "Get some rest (that nap is calling your name)",
  },
];

// For each item in the todoList array, return a list item <li> with:
// -the id (its key attribute value); and
// -the title (displays text in the browser)
let TodoList = () => {
  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>

    // Example of implicit return statement as one line (another way of returning same JSX)
    // <ul>
    //   {todoList.map((item) => <li key={item.id}>{item.title}</li> )}
    // </ul>
  );
};

export default TodoList;
