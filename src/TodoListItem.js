import React from "react";

// Return input field value (what user typed and submitted) in a <li> display
function TodoListItem({ todo }) {
  return <li>{todo.title}</li>;
}

export default TodoListItem;
