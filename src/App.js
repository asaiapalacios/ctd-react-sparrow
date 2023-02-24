import React, { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import style from './App.module.css';
import headphone from './assets/headphone1.jpg';
import cassette1 from './assets/cassette1.jpg';
import cassette3 from './assets/cassette3.jpg';
import { ReactComponent as Home } from './home.svg';
import { ReactComponent as LinkedIn } from './linkedin.svg';
import { ReactComponent as Mail } from './mail.svg';
import { FiGithub } from 'react-icons/fi'

function App() {
  // Set initial states
  const [todoList, setTodoList] = useState([]); // an empty array upon component initialization
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  // Use tableName in place of url's Default for making Airtable requests (GET, POST, DELETE)
  // Note: at Airtable's project page, we need to rename Default table first in order for the requests to sync up
  const tableName = 'Jam Away';

  // Initialize form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const request = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`;
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
      .then((data) => {
        console.log('GET fetch request returns this object:', data);
        console.log(
          'Now access value of property records -> array of objects:',
          data.records
        );
        
        // -sort list in ascending order by Title (short version):
        // const sortAsc = data.records.sort((objectA, objectB) => objectA.fields.Title - objectB.fields.Title);
        // console.log('Data sorted by Title in ascending order, A-Z:', sortAsc);

        // setTodoList(sortAsc);

        // OR 
        // -sort list in descending order by Title (short version):
        // const sortDesc = data.records.sort((objectA, objectB) => return objectB.fields.Title - objectA.fields.Title);
        // console.log('Data sorted by Title in descending order, Z-A:' sortDesc);

        // setTodoList(sortDesc);

        // -update todoList from an empty array to current state (references the fetched JSON data)
        setTodoList(data.records);

        // -update isLoading state to false -> "Loading...One sec" text is no longer rendered
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

  function sortTitle(objectA, objectB) {
    // Sort in descending order after you click on sort button (default order is ascending when loading)
    if(isAscending) {
      setIsAscending(!isAscending);
      if(objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
        return 1;
      }
      if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
        return -1;
      }
      return 0;
    }
    // Sort in ascending order
    if(!isAscending) {
      setIsAscending(!isAscending);
      if(objectA.fields.Title.toLowerCase() < objectB.fields.Title.toLowerCase()) {
        return -1;
      }
      if (objectA.fields.Title.toLowerCase() > objectB.fields.Title.toLowerCase()) {
        return 1;
      }
      return 0;
    }
  }
  // Pass function to compare objects for sorting, then set list
  const handleSort = (sortFunc) => {
    let sortList = todoList.sort(sortFunc);
    setTodoList(sortList);
  };

  // For 'Get in Touch' form
  const handleClick = e => {
    // Prevent page refresh
    e.preventDefault();
    
    // Access input values
    console.log('fullName:', fullName);
    console.log('email:', email);
    console.log('message:', message);

    // Clear all input values in the form after click 'Send Away'
    setFullName('');
    setEmail('');
    setMessage('');
  };

  // 5) Create new todoList via fetch API POST request
  // callback's parameter 'title' receives current state todoTitle w/in obj -> {fields: { Title: todoTitle }}
  const addTodo = (title) => {
    const urlEndpt = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;
    const postOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      // Convert object into a string to send it over a network (Airtable expects obj formatted this way)
      // note: property records stores array of object [title] -> {fields: { Title: todoTitle }}
      body: JSON.stringify({
        records: [title],
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
    const urlEndpt = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}/${id}`;
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
              <nav className={`${style.grid} ${style.siteNav}`}>
                <h1>{tableName}</h1>
                <Link to='/jams'>
                  <button className={style.button}>
                    <Mail title='Contact' />
                  </button>
                </Link>
              </nav>
              <section className={`${style.grid} ${style.welcome}`}>
                <div className={style.welcomeText}>
                  <h2>
                    Add Music
                    <br />
                    to your Jam List
                  </h2>
                  <p className={style.leading}>
                    Long lost forgotten songs? No more. Include them in your
                    playlist with this jam list reminder!
                  </p>
                  <HashLink to='#jamList' smooth>
                    <button className={style.buttonJam}>Let's Jam</button>
                  </HashLink>
                </div>
                <div className={style.welcomeImg}>
                  <img
                    src={headphone}
                    alt='A headphone lying next to colorful confetti by Ryan Quintal'
                  />
                </div>
              </section>
              <section className={style.jamList} id='jamList'>
                <h2>Jam List</h2>
                <p className={style.leading}>
                  Enter your fave song. Watch as your
                  to-be playlist unfolds.
                </p>
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
                  <p>Loading...One sec</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} sortTitle={sortTitle} handleSort={handleSort} />
                )}
              </section>
              <section className={style.spaceSection}>
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
                        href='https://github.com/asaiapalacios/ctd-react-sparrow'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <FiGithub className={style.linkSocial} title='GitHub' />
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.linkedin.com/in/asaiapalacios/'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <LinkedIn className={style.linkSocial} title='LinkedIn' />
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
            </>
          }
        />
        {/* Create a new Route wtih path '/jams'; insert Airtable's default project name to h1 */}
        <Route
          path='/jams'
          element={
            <>
              <nav className={`${style.grid} ${style.siteNav}`}>
                <h1>{tableName}</h1>
                <Link to='/'>
                  <button className={style.button}>
                    <Home title='Home' />
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
                  Sound off. Share your thoughts on this app design. Gracias!
                </p>
                <form>
                  <input
                    className={style.contactBorder}
                    id='full_name'
                    name='full_name'
                    type='text'
                    placeholder='NAME'
                    onChange={e => setFullName(e.target.value)}
                    value={fullName}
                  />
                  <input
                    className={style.contactBorder}
                    id='email'
                    name='email'
                    type='email'
                    placeholder='EMAIL'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                  <textarea
                    className={style.contactBorder}
                    id='message'
                    name='message'
                    placeholder='YOUR MESSAGE'
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                  ></textarea>
                  <button className={style.buttonSend} type='button' onClick={handleClick}>Send Away</button>
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
                        href='https://github.com/asaiapalacios/ctd-react-sparrow'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <FiGithub className={style.linkSocial} title='GitHub' />
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.linkedin.com/in/asaiapalacios/'
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        <LinkedIn className={style.linkSocial} title='LinkedIn' />
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

App.protoTypes = {
  tableName: PropTypes.string,
  sortTitle: PropTypes.func,
  handleSort: PropTypes.func,
}
