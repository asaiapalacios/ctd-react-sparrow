import React from "react";

// New functional component that returns the title of each item
function TodoListItem(props) {
  // Update the todo object reference to come from props
  return <li>{props.todo.title}</li>;
}

export default TodoListItem;
