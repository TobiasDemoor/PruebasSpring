import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import GroupEdit from "./components/GroupEdit";
import GroupList from "./components/GroupList";
import './App.css';


function App() {
    return (
        <BrowserRouter className="App">
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/groups/:id' component={GroupEdit}/>
                <Route path='/groups' component={GroupList}/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
