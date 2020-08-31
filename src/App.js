import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEM naming convention
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />   
            {/** Sidebar component */}
            <div className="app__body">
              <Sidebar />
              <Switch>
                {/** React Router -> Chat screen */}
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <h1>Welcome</h1>
                </Route>
              </Switch>
            </div>
            {/** React Router -> Chat screen logic */}
          </>
        )}  
      </Router>
    </div>
  );
}

export default App;
