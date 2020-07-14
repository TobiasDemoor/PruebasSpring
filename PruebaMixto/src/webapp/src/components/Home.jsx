import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../store/user/userActions';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

Home.propTypes = {}

function mapStateToProps(state) {
    return {
        isLoading: state.user.isLoading,
        isAuthenticated: state.user.isAuthenticated,
        user: state.user.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);