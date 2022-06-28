import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import { HashLink as Link } from 'react-router-hash-link';

import style from './App.module.css';
import headphone from './headphone1.jpg';
import cassette1 from './cassette1.jpg';
import cassette3 from './cassette3.jpg';
import { ReactComponent as Home } from './home.svg';
import { ReactComponent as Mail } from './mail.svg';
import { ReactComponent as GitHub } from './github.svg';
import { ReactComponent as LinkedIn } from './linkedin.svg';

function App() {
  // 1) Set initial state to an empty array upon component initialization
  const [todoList, setTodoList] = useState([]);
  // 2)
  const [isLoading, setIsLoading] = useState(true);
  // 3) Upon component initialization (loading/refreshing page):

  // const navigate = useNavigate();

  useEffect(() => {
    const request = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
    };
    // -fetch/GET asynchronous data from a real remote 3rd-party API via:
    // a) the endpoint URL (request); and
    // b) the token to authorize the request (options).
    fetch(request, options)
      // -pass a function to the then method that returns the response JSON data
      .then((response) => response.json())
      // -receive JSON data to then...
      .then((result) => {
        console.log('GET fetch request returns this object:', result);
        console.log(
          'Now access value of property records -> array of objects:',
          result.records
        );
        // -update todoList from an empty array to current state (references the new result format)
        setTodoList(result.records);
        // -update isLoading state to false -> "Loading..." text is no longer rendered
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Error (GET request):', error);
      });
  }, []);

  // 6 & 9) After todoList state gets updated and isLoading is set to false, useEffect tracks when:
  // -there are changes to todoList (upon user typing in input field and submitting form);
  // -if there are changes to todoList state, then...
  useEffect(() => {
    if (!isLoading) {
      // *write*/save current state value in str format to browser local storage (sync state to storage)
      // note: JSON.stringify() transforms object into a string
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // 5) Create new todoList via fetch API POST request
  // callback's parameter newTodo receives current state todoTitle w/in obj -> {fields: { Title: todoTitle }}
  const addTodo = (newTodo) => {
    const urlEndpt = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
    const postOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      // Convert object into a string to send it over a network (Airtable expects obj formatted this way)
      // note: property records stores array of object [newTodo] -> {fields: { Title: todoTitle }}
      body: JSON.stringify({
        records: [newTodo],
      }),
    };

    fetch(urlEndpt, postOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(
          'POST request returns object storing Title -> what user input submitted for post:',
          data
        );
        console.log(
          'Now access value of records -> array of object:',
          data.records
        );
        // Pass item user wants to post (what data.records stores, its array of obj) to the state setter funct
        // -> ...data.records appends to end of todoList array
        // -> todoList updates from a copy of previous state to current state via setter function setTodoList
        setTodoList([...todoList, ...data.records]);
        // note: App component currently displays PREVIOUS state when console.log inside code block
        // console.log(todoList);
      })
      .catch((error) => {
        console.log('Error (POST request):', error);
      });
  };
  // now: App component re-renders to CURRENT state of array of objects when console log outside of addTodo
  console.log(todoList);

  // 8) Remove clicked item via fetch API DELETE request passing todo.id argument (now as id parameter)
  const removeTodo = (id) => {
    const urlEndpt = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`;
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    fetch(urlEndpt, deleteOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(
          'DELETE request returns object storing id specific to item user wishes to remove',
          data
        );
        const idToRemove = data.id;
        // For every item of the list, store new array of items to render if items meet truthy expression
        // If expression is false (if item.id does === id), the item(s) are removed + not included in new array
        const newList = todoList.filter((item) => item.id !== idToRemove);
        // Render, after exiting callback handler, a new array w/out items filter() removed (b/c expression false)
        // Note: newList *IS* todoList
        setTodoList(newList);
      })
      .catch((error) => {
        console.log('Error (DELETE request):', error);
      });
  };

  return (
    // Wrap existing JSX
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            // Insert fragment use when you don't want to introduce an element (div) to satisfy React rules
            <>
              <nav className={style.grid}>
                <h1>Jam Away</h1>
                <Link to='/jams'>
                  <button className={style.button}>
                    <Mail height='20px' width='20px' />
                  </button>
                </Link>
              </nav>
              <section className={`${style.grid} ${style.welcome}`}>
                <div className={style.welcomeText}>
                  <h2>
                    Add music
                    <br />
                    to you Jam List
                  </h2>
                  <p className={style.leading}>
                    Long lost forgotten songs? No more. Include them in your
                    playlist with this jam list reminder!
                  </p>
                  <Link to='/jams'>
                    <button className={style.buttonJam}>Let's Jam</button>
                  </Link>
                </div>
                <div className={style.welcomeImg}>
                  <img
                    src={headphone}
                    alt='A headphone lying next to colorful confetti by Ryan Quintal'
                  />
                </div>
              </section>
              <section className={style.jamList}>
                <h2>Jam List</h2>
                <p className={style.leading}>
                  Enter your fave but forgotten song. Add and watch as your
                  to-be playlist unfolds.
                </p>
                {/* <p className={style.leading}>
                  Enter your fave but forgotten song. Add and watch as your
                  updated list for your to-be playlist unfolds.
                </p> */}

                {/* 4) AddTodoForm instance:
                -receives a passed object (current state of user input + unique no./id) after form is submitted
                -> reference to the handler function addTodo is now invoked, passing object as an argument */}
                <AddTodoForm onAddTodo={addTodo} />
                {/* 7) After passing todoList (array of objects) in its updated CURRENT form to TodoList component...
                -TodoList instance receives back:
                  -> what user has typed & submitted in a <li> format, now ready to be rendered into React.DOM 
                  -> todo.id, which a user wants removed (upon clicking the remove button); argument sent to handler */}

                {/* If isLoading is true, display "Loading..." text below form, otherwise, render stored listed items */}
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
                <Link to='/jams'>
                  <button className={style.buttonContact}>Get in Touch</button>
                </Link>
              </section>
              <footer>
                <div className={style.grid}>
                  <p className={style.copyright}>
                    Copyright 2022 Asaia Palacios
                  </p>
                  <ul className={style.social}>
                    <li>
                      <a
                        href='https://github.com/asaiapalacios'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <GitHub className={style.linkSocial} />
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.linkedin.com/in/asaiapalacios/'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <LinkedIn className={style.linkSocial} />
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
            </>
          }
        />
        {/* Create a new Route w/path "/new" and a h1 w/text */}
        <Route
          path='/jams'
          element={
            <>
              <nav className={style.grid}>
                <h1>Jam Away</h1>
                <Link to='/'>
                  <button className={style.button}>
                    <Home height='20px' width='20px' />
                  </button>
                </Link>
              </nav>
              <section className={style.skills}>
                <h3>Created With</h3>
                <ul className={style.grid}>
                  <li>
                    <img
                      className={style.cassetteStyle1}
                      src={cassette1}
                      alt='a classic cassette'
                    />
                    <h4>JavaScript</h4>
                  </li>
                  <li>
                    <img
                      className={style.cassetteStyle2}
                      src={cassette3}
                      alt='a black cassette with a touch of neutral colors'
                    />
                    <h4>React</h4>
                  </li>
                </ul>
              </section>
              <section className={style.contact}>
                <h3>Get in Touch</h3>
                <p className={style.leading}>
                  Sound off your thoughts on this app design. Gracias!
                </p>
                <form>
                  <input
                    className={style.contactBorder}
                    type='text'
                    placeholder='NAME'
                  />
                  <input
                    className={style.contactBorder}
                    type='email'
                    placeholder='EMAIL'
                  />
                  <textarea
                    className={style.contactBorder}
                    placeholder='YOUR MESSAGE'
                  ></textarea>
                  <button className={style.buttonNeon}>Send Away</button>
                </form>
              </section>
              <footer>
                <div className={style.grid}>
                  <p className={style.copyright}>
                    Copyright 2022 Asaia Palacios
                  </p>
                  <ul className={style.social}>
                    <li>
                      <a
                        href='https://github.com/asaiapalacios'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <GitHub className={style.linkSocial} />
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.linkedin.com/in/asaiapalacios/'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <LinkedIn className={style.linkSocial} />
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
