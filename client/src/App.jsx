import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { React, useEffect, useState } from 'react';
import { Container, Toast } from 'react-bootstrap/';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Navigation } from './components/Navigation';
import { AddLayout, DefaultLayout, EditLayout, LoadingLayout, LoginLayout, MainLayout, NotFoundLayout } from './components/PageLayout';

import { getUserInfo, logIn, logOut } from './API';
import MessageContext from './messageCtx';

function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // This state contains the list of films (it is initialized from a predefined array).

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg);
  }

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const user = await getUserInfo();  // here you have the user info, if already logged in
        setUser(user);
        setLoggedIn(true); setLoading(false);
      } catch (err) {
        handleErrors(err); // mostly unauthenticated user, thus set not logged in
        setUser(null);
        setLoggedIn(false); setLoading(false);
      }
    };
    init();
  }, []); 

  /**
   * This function handles the login process.
   * It requires a username and a password inside a "credentials" object.
   */
  const handleLogin = async (credentials) => {
    try {
      const user = await logIn(credentials);
      setUser(user);
      setLoggedIn(true);
    } catch (err) {
      // error is handled and visualized in the login form, do not manage error, throw it
      throw err;
    }
  };

  /**
   * This function handles the logout process.
   */ 
  const handleLogout = async () => {
    await logOut();
    setLoggedIn(false);
    // clean up everything
    setUser(null);
    setFilms([]);
  };

  return (
    <BrowserRouter>
      <MessageContext.Provider value={{ handleErrors }}>
        <Container fluid className="App">

          <Navigation logout={handleLogout} user={user} loggedIn={loggedIn} />

          <Routes>
            <Route path="/" element={
            loading ? <LoadingLayout /> : <DefaultLayout/>
            } >
              <Route index element={loggedIn ? <MainLayout  /> : <Navigate replace to='/login' />} />
              <Route path="filter/:filterLabel" element={loggedIn ? <MainLayout  /> : <Navigate replace to='/login' />} />
              <Route path="add" element={loggedIn ? <AddLayout /> : <Navigate replace to='/login' />} />
              <Route path="edit/:filmId" element={loggedIn ? <EditLayout/> : <Navigate replace to='/login' />} />
              <Route path="*" element={<NotFoundLayout />} />
            </Route>
            <Route path="/login" element={!loggedIn ? <LoginLayout login={handleLogin} /> : <Navigate replace to='/' />} />
          </Routes>

          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide bg="danger">
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Container>
      </MessageContext.Provider>
    </BrowserRouter>
  );

}

export default App;
