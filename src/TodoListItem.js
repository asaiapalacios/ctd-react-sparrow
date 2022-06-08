import React from 'react';

// Return Title/input field value (what user typed and submitted) in <li>
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li>
      {/* Pinpoint how to access specifically the Title value (what user wishes to post in list item format after submitting typed input) */}
      {todo.fields.Title}
      {/* Pass back to TodoListItem instance, upon click, the callback w/argument that identifies which item user wishes to remove */}
      <button type='button' onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
