import React from "react";

// Return title/input field value (what user typed and submitted) in <li>
function TodoListItem({ todo }) {
  return <li>{todo.title}</li>;
}

export default TodoListItem;
