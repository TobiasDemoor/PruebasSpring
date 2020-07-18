import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
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
        const {value, id} = event.target;
        this.setState(
            (prevState) => ({
                ...prevState,
                [id]: value
            })
        )
    }

    login() {
        document.getElementById("loginSubmit").click();
    }

    render() {
        const {username, password} = this.state;
        const {csrfToken} = this.props;

        return (
            <div>
                <TextField required fullWidth label="Username" id="username" value={username}
                           onChange={this.handleChange} autoComplete="username"/>
                <TextField required fullWidth label="Password" id="password" type="password" value={password}
                           onChange={this.handleChange} autoComplete="password"/>
                <Button variant="contained" onClick={this.login}>
                    Login
                </Button>
                <form method="POST" action={"/api/login"}>
                    <input name="username" type="hidden" value={username}/>
                    <input name="password" type="hidden" value={password}/>
                    <input name="_csrf" type="hidden" value={csrfToken}/>
                    <button id="loginSubmit" type="submit" hidden/>
                </form>
            </div>
        );
    }
}

LoginPage.propTypes = {};

function mapStateToProps(state) {
    return {
        csrfToken: state.user.csrfToken
    }
}

export default connect(mapStateToProps)(LoginPage);
