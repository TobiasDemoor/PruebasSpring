import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {ButtonGroup, Button, Container, Table} from "@material-ui/core";
import {loadGroups, removeGroup} from "../services/groups.service";
import AppNavbar from './AppNavbar';

class GroupList extends Component {

    componentDidMount() {
        this.props.loadGroups();
    }

    render() {
        const {groups, isLoading, remove, error} = this.props;
        if (error) {
            this.props.history.push('/');
        } else {
            if (isLoading) {
                return <p>Loading...</p>;
            } else {
                const groupList = groups.map(
                    function (group) {
                        const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
                        return (
                            <tr key={group.id}>
                                <td style={{whiteSpace: 'nowrap'}}>{group.name}</td>
                                <td>{address}</td>
                                <td>{group.events.map(event => {
                                    return (
                                        <div key={event.id}>
                                            {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit'
                                            }).format(new Date(event.date))}: {event.title}
                                        </div>
                                    )
                                })}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" color="primary" tag={Link}
                                                to={"/groups/" + group.id}>Edit</Button>
                                        <Button size="sm" color="danger"
                                                onClick={() => remove(group.id)}>Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    });
                return (
                    <div>
                        <AppNavbar/>
                        <Container fluid>
                            <div className="float-right">
                                <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
                            </div>
                            <h3>My HUG Tour</h3>
                            <Table className="mt-4">
                                <thead>
                                <tr>
                                    <th style="width:20%">Name</th>
                                    <th style="width:20%">Location</th>
                                    <th>Events</th>
                                    <th style="width:10%">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {groupList}
                                </tbody>
                            </Table>
                        </Container>
                    </div>
                );
            }
        }
    }
}

GroupList.propTypes = {
    groups: PropTypes.any,
    isLoading: PropTypes.bool,
    error: PropTypes.any
}

function mapStateToProps(state) {
    return {
        groups: state.groups.groups,
        isLoading: state.groups.isLoading,
        error: state.groups.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroups: () => dispatch(loadGroups()),
        remove: id => dispatch(removeGroup(id))
    };
}

export default withRouter(connect(
    mapStateToProps, mapDispatchToProps
)(GroupList));