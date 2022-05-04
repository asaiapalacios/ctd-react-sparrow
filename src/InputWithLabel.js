import { useEffect, useRef } from "react";

// Create a reusable component
const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  // Goal: Add auto-focus to input (via the imperative way)
  // a) use hook to create a ref object
  const inputRef = useRef();

  // c) can now use the DOM node (assigned to ref's current property), to interact w/input element's API
  useEffect(() => {
    // d) make input element focused on page load + when user submits form (refocuses automatically w/Enter key)
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        // 2) Receive user typed value in input field from updated state (prop todoTitle)
        // example of a controlled input:
        // i.e., our "one source of truth," as opposed to value coming from input element's native behavior
        value={todoTitle}
        // b) provide the ref object, inputRef, to the input element as ref HTML attribute
        // -> React automaticaly assigns the DOM node of this input element to the ref object for us
        ref={inputRef}
        // 1) User TYPES into input field -> (e) obj is created -> (e) is passed to callback of AddTodoForm comp
        onChange={handleTitleChange}
      />
    </>
  );
};

export default InputWithLabel;
