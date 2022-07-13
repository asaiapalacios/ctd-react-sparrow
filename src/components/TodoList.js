import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';
import style from './TodoList.module.css';
import { TbArrowsUpDown } from 'react-icons/tb'

// Return from each item its input field value (Title) in <li>
function TodoList({ todoList, onRemoveTodo, handleSort, sortTitle }) {

  return (
    <ul>
      {(todoList.length !== 0 && todoList.length >= 2) && <button className={style.buttonAscDesc} type='button' onClick={() => handleSort(sortTitle)}>
        <TbArrowsUpDown size='1.2em' title='Sort' />
      </button>}
      {/* Note: todo is an object item with key:value pairs */}
      {/* For each object item of passed array of objects to TodoListItem component...
      instance receives back each todo item, the input field value (Title) in <li> form */}
      {todoList.map((todo) => {
        return (
          // Pass back to TodoList instance in App comp: item id, user input value + callback w/arg (todo.id)
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object),
  onRemoveTodo: PropTypes.func,
  handleSort: PropTypes.func,
  sortTitle: PropTypes.func,
};

export default TodoList;
