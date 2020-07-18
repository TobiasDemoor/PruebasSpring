import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {signUp} from "../store/user/userActions";
import Button from "@material-ui/core/Button";


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            error: null,
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.signUp = this.signUp.bind(this);
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

    signUp(event) {
        const {name, username, password, confirmPassword} = this.state;
        event.preventDefault();
        if (password === confirmPassword) {
            this.props.signUp({name, username, password});
            this.setState({submitted: true, error: null});
        } else {
            this.setState({error: "Passwords don't match"});
        }
    }


    render() {
        const {name, username, password, confirmPassword, error, submitted} = this.state;
        const {sgUpError, user} = this.props;
        if (submitted && !sgUpError) {
            if (!user) {
                return <p>Loading</p>
            } else {
                return <Redirect to="/" from={this.props.location}/>
            }
        }
        return (
            <div>
                {error && <p>{error}</p>}
                {sgUpError && <p>{sgUpError}</p>}
                <form onSubmit={this.signUp}>
                    <TextField required fullWidth label="Name" id="name" value={name}
                               onChange={this.handleChange} autoComplete="name"/>
                    <TextField required fullWidth label="Username" id="username" value={username}
                               onChange={this.handleChange}/>
                    <TextField required fullWidth label="Password" id="password" type="password" value={password}
                               onChange={this.handleChange}/>
                    <TextField required fullWidth label="Confirm password" id="confirmPassword" type="password" value={confirmPassword}
                               onChange={this.handleChange}/>
                    <Button variant="contained" type="submit">
                        SignUp
                    </Button>
                </form>
            </div>
        );
    }
}
 SignUpPage.propTypes = {};

function mapStateToProps(state) {
    return {
        sgUpError: state.user.sgUpError,
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: data => dispatch(signUp(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);