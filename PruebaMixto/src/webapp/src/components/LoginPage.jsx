import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import {getUser, login} from "../store/user/userActions";
import Button from "@material-ui/core/Button";


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'prueba',
            password: 'prueba'
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {value, name} = event.target;
        this.setState(
            (prevState) => ({
                ...prevState,
                [name]: value
            })
        )
    }

    render() {
        const {username, password} = this.state;
        const {user, csrfToken} = this.props;
        if (!csrfToken) {
            this.props.getUser();
        }
        if (user) {
            this.props.history.push("/");
        }

        return (
            <form method="POST" action={`${process.env.REACT_APP_API_BASE_URL}/api/login`}>
                <TextField fullWidth label="Username" id="username" value={username}
                           onChange={this.handleChange} autoComplete="name"/>
                <TextField fullWidth label="Password" id="password" type="password" value={password}
                           onChange={this.handleChange} autoComplete="name"/>
                <input name="username" type="hidden" value={username}/>
                <input name="password" type="hidden" value={password}/>
                <input name="_csrf" type="hidden" value={csrfToken}/>
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </form>
        );
    }
}

LoginPage.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        csrfToken: state.user.csrfToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: data => dispatch(login(data)),
        getUser: () => dispatch(getUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
