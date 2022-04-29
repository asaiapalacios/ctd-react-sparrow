import React from "react";
import TodoListItem from "./TodoListItem";

// Return from each object of an array its input field value (title)) in <li>
function TodoList({ todoList }) {
  return (
    <ul>
      {/* Note: todo is an object with key:value pairs of title and id */}
      {/* For each item of passed array of objects to TodoListItem component...
      instance receives back the input field value (title) in <li> form */}
      {todoList.map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
}

export default TodoList;
