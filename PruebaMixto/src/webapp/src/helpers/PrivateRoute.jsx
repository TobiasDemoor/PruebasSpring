import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getUser} from "../store/user/userActions";

PrivateRoute.propTypes = {
    component: PropTypes.elementType,
    authorized: PropTypes.bool,
    csrfToken: PropTypes.string
};

function PrivateRoute({
                          component: Component, authorized = true, csrfToken, user, getUser, ...rest
}) {
    if (!csrfToken) {
        getUser();
    }
    return (
        <Route
            {...rest}
            render={props => (
                ((user && authorized) || (!user && !authorized))
                    ? <Component {...props} />
                    : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
            )}
        />
    );
}


function mapStateToProps(state) {
    return {
        csrfToken: state.user.csrfToken,
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);