import React, { Component } from 'react';
import './App.css';
import Home from './components/Home.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GroupList from './components/GroupList.jsx';
import GroupEdit from './components/GroupEdit.jsx';
import { CookiesProvider } from 'react-cookie';

class App extends Component {
  render() {
    return (
      <CookiesProvider className="App">
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/groups' exact={true} component={GroupList} />
            <Route path='/groups/:id' component={GroupEdit} />
          </Switch>
        </Router>
      </CookiesProvider>
    )
  }
}


export default App;
