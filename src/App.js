import React from "react";

const todoList = [
  {
    id: 1,
    title: "Complete assignment",
  },
  {
    id: 2,
    title: "Review JavaScript fundamentals",
  },
  {
    id: 3,
    title: "Review JavaScript in JSX",
  },
];

// JavaScript in JSX can:
// -display items
// -assign HTML attributes dynamically
function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {/* For each object in the array, return a list item (<li>) with: */}
        {/* -an id value (as its key attribute) */}
        {/* -a title value (displays inner text content) */}
        {todoList.map(function (item) {
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
