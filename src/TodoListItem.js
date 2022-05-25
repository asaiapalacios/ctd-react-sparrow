import React from "react";

// Return title/input field value (what user typed and submitted) in <li>
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li>
      {/* Update the todo item title to reference the new object format */}
      {todo.fields.Title}
      {/* Pass back to TodoListItem instance the callback w/argument upon click */}
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
