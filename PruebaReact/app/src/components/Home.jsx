import React, { Component } from 'react';
import '../App.css';
import AppNavbar from './AppNavbar.jsx';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';
import { getUser, logout } from '../services/service';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    }

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state.csrfToken = cookies.get("XSRF-TOKEN");
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const body = await getUser();
        if (body === '') {
            this.setState({ isAuthenticated: false });
        } else {
            this.setState({ isAuthenticated: true, user: JSON.parse(body) });
        }
    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        console.log(window.location.hostname + port + '/private');
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        logout(this.state.csrfToken);
    }

    render() {
        const message = this.state.user ?
            <h2>Welcome, {this.state.user.name}!</h2> :
            <p>Please log in to manage your JUG Tour.</p>;
        const button = this.state.isAuthenticated ?
        <div>
            <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
            <br/>
            <Button color="link" onClick={this.logout}>Logout</Button>
        </div> :
        <Button color="link" onClick={this.login}>Login</Button>;
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    {message}
                    {button}
                </Container>
            </div>
        )
    }
}

export default withCookies(Home);