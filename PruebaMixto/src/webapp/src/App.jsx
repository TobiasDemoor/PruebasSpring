import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import GroupEdit from "./components/GroupEdit";
import GroupList from "./components/GroupList";
import SignUpPage from "./components/SignUpPage";
import PrivateRoute from "./helpers/PrivateRoute";
import './App.css';


function App() {
    return (
        <BrowserRouter className="App">
            <Switch>
                <Route path='/' exact={true} component={Home}/>
                <PrivateRoute authorized={false} path='/login' component={LoginPage}/>
                <PrivateRoute authorized={false} path='/signUp' component={SignUpPage}/>
                <PrivateRoute path='/groups/:id' component={GroupEdit}/>
                <PrivateRoute path='/groups' component={GroupList}/>
            </Switch>
        </BrowserRouter>
    );
}


export default App;
