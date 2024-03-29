import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../store/user/userActions';
import AppNavbar from "./AppNavbar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class Home extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    logout() {
        document.getElementById("logoutSubmit").click()
    }

    render() {
        const {isLoading, isAuthenticated, user, csrfToken} = this.props;
        let result;
        if (isLoading) {
            result = <p>Loading...</p>;
        } else {
            let message, buttons
            if (isAuthenticated) {
                message = <p>Welcome, {user.name}</p>;
                buttons = (
                    <div>
                        <Button component={Link} to="/groups">Manage JUG Tour</Button>
                        <Button onClick={this.logout}>Logout</Button>
                        <form method="POST" action="/api/logout">
                            <input name="_csrf" type="hidden" value={csrfToken}/>
                            <button id="logoutSubmit" type="submit" hidden/>
                        </form>
                    </div>
                );
            } else {
                message = <p>Please login</p>;
                buttons = (
                    <div>
                        <Button component={Link} to="/login">Login</Button>
                        <Button component={Link} to="/signUp">Sign Up</Button>
                    </div>
                );
            }
            result = (
                <div>
                    <AppNavbar/>
                    <Container fluid="true">
                        {message}
                        {buttons}
                    </Container>
                </div>
            )
        }
        return result;
    }
}

Home.propTypes = {}

function mapStateToProps(state) {
    return {
        isLoading: state.user.isLoading,
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.user,
        csrfToken: state.user.csrfToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);