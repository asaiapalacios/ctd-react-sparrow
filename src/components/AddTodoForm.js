import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo }) {
  // A place to store what user types in input field: todoTitle state; initially empty
  const [todoTitle, setTodoTitle] = useState('');

  // 2) todoTitle state gets updated (initally an empty string):
  // -> state will store current value user typed in input field
  let handleTitleChange = (e) => {
    // console.log(e);
    // Retrieve user's input field value (text typed)
    let newTodoTitle = e.target.value;
    // Update state -> newTodoTitle *IS* todoTitle
    setTodoTitle(newTodoTitle);
  };
  // todoTitle state now updated to current state
  console.log(todoTitle);

  // 5) Goal: pass object (of fields w/Title prop & value -> current state of user input) to <AddTodoForm />
  let handleAddTodo = (e) => {
    // Prevent the browser from executing the default behavior of the form submit
    // i.e., form won't be sent to another location & page won't be refreshed
    e.preventDefault();
    // Pass object to <AddTodoForm /> in App component (onAddTodo *IS* addTodo reference to handler func)
    onAddTodo({
      fields: { Title: todoTitle },
    });

    // Previous object setup
    // onAddTodo({
    //   title: todoTitle,
    //   id: Date.now(),
    // });

    // Reset todoTitle state to an empty string (to clear value) each time user submits form
    setTodoTitle('');
  };

  return (
    // 4) When user SUBMITS a typed input, an (e) obj is passed to handler func reference handleAddTodo
    <form className={style.listForm} onSubmit={handleAddTodo}>
      <InputWithLabel
        // 3) Send updated state, todoTitle, to value attribute of InputWithLabel component
        todoTitle={todoTitle}
        // 1) Receive back (e) obj from InputWithLabel component, now passed as an arg to event handler
        handleTitleChange={handleTitleChange}
      ></InputWithLabel>
      <button className={style.buttonAdd} type='submit'>
        + Add Song
      </button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
