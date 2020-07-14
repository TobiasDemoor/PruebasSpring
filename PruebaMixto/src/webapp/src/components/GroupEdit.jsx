import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadGroup, editGroup} from "../services/groups.service";

class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.state.id = props.id;
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

GroupEdit.propTypes = {
    id: PropTypes.number
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroup: id => dispatch(loadGroup(id)),
        editGroup: item => dispatch(editGroup(item))
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(GroupEdit);