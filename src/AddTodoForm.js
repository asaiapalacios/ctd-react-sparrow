import React from "react";

function AddTodoForm(props) {
  const handleAddTodo = (event) => {
    // Prevent the browser from executing the default behavior of the form submit
    // i.e., form won't be sent to another location & page won't be refreshed
    event.preventDefault();
    // Retrieve the user's input (value) of this specific input field
    let todoTitle = event.target.title.value;
    console.log(todoTitle);
    // Reset form so the text input value is cleared
    event.target.reset();
    // Invoke the onAddTodo callback prop and pass newTodo as an argument back to App component
    props.onAddTodo(todoTitle);
  };

  return (
    // The browser will (2):
    // 1) Create an event object when...
    // -the user types a value in the input field; and
    // -presses the Enter key or selects the Add button to submit.

    // 2) Put details into...
    // -the event object; then
    // -pass it as an argument (event) to the handler (handleAddTodo).
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title </label>
      <input type="text" id="todoTitle" name="title"></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
