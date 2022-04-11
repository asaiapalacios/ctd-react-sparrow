import React from "react";
import TodoListItem from "./TodoListItem";

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
function TodoList() {
  return (
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
