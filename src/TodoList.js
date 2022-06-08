import React from 'react';
import TodoListItem from './TodoListItem';

// Return from each item its input field value (Title) in <li>
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
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

export default TodoList;
