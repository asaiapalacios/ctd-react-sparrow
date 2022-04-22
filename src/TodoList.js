import React from "react";
import TodoListItem from "./TodoListItem";

// Return current state input field value in <li>
function TodoList({ todoList }) {
  return (
    <ul>
      {/* For each item of passed obj, return input field value (title) in <li> */}
      {/* Note: todo is an object with key:value pairs of title and id */}
      {todoList.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
