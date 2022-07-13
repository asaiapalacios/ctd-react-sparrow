import React from 'react';
import style from './TodoListItem.module.css';
// import PropTypes from '.prop-types';

// Return Title/input field value (what user typed and submitted) in <li>
function TodoListItem({ todo, onRemoveTodo }) {
  // console.log(todo);
  return (
    <li className={style.listItem}>
      {/* Pinpoint how to access specifically the Title value (what user wishes to post in list item format after submitting typed input) */}
      {todo.fields.Title}
      {/* Pass back to TodoListItem instance, upon click, the callback w/argument that identifies which item user wishes to remove */}
      <button
        className={style.buttonRemove}
        type='button'
        onClick={() => onRemoveTodo(todo.id)}
      >
        X
      </button>
    </li>
  );
}

// TodoListItem.prototypes = {
//   todo: PropTypes.object,
//   onRemoveTodo: PropTypes.func,
// };

export default TodoListItem;
