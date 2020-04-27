import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//pages import
import Home from './pages/Home'
import Todo from './pages/Todo'

function App() {
  const routes = [
    {
      path: '/',
      exact: true,
      children: <Home />
    },
    {
      path: '/todo',
      children: <Todo />
    }
  ]
  return (
    <Router>
      <div className="App">
        <Switch>
          {routes.map((i, idx) => {
            return(
              <Route key={idx} {...i}/>
            )
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
