import React from 'react';
import './App.css';
import NavBar from './components/layouts/NavBar';
import { Switch, Route, Redirect } from 'react-router-dom';
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFountPage from './components/pages/NotFountPage';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './context/alert/AlertState';
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/SetAuthToken';
import PriavteRoute from './components/routing/PriavteRoute';


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <>
      <AuthState>
        <ContactState>
          <AlertState>
            <header>
              <NavBar />
            </header>
            <main className="container">
              <Alert />
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={About} />
                <Route path="/not-found" component={NotFountPage} />
                <PriavteRoute path="/" exact component={Home} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </AlertState>
        </ContactState>
      </AuthState>
    </>
  );
}

export default App;
