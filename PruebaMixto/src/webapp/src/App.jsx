import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import './App.css';


function App() {
    return (
        <BrowserRouter className="App">
            <Switch>
                <Route path='/' exact={true} component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
