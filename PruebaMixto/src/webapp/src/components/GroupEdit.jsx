import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadGroup, submitGroup} from "../store/groups/groupsActions";
import AppNavbar from "./AppNavbar";
import {Typography, Container, TextField, Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const styles = theme => ({
    buttons: {
        float: "right",
        margin: theme.spacing(3)
    },
    third: {
        width: "33.3%"
    }
})


class GroupEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: undefined,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const {loadGroup} = this.props;
        if (id !== 'new') {
            loadGroup(id);
        } else {
            this.setState({
                item: {
                    name: '',
                    address: '',
                    city: '',
                    stateOrProvince: '',
                    country: '',
                    postalCode: ''
                }
            })
        }
    }

    componentDidUpdate() {
        if (!this.state.item && this.props.item) {
            this.setState({item: this.props.item});
        }
    }

    handleChange(event) {
        const {value, id} = event.target;
        let item = {...this.state.item};
        item[id] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitGroup(this.state.item);
    }

    render() {
        const {item} = this.state;
        const {classes} = this.props;
        if (!item) {
            return <p>Loading...</p>;
        }
        const title = <Typography variant="h2">{item.id ? 'Edit Group' : 'Add Group'}</Typography>
        return (
            <div>
                <AppNavbar/>
                <Container>
                    {title}
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField fullWidth label="Name" id="name" value={item.name || ''}
                                       onChange={this.handleChange} autoComplete="name"/>
                            <TextField fullWidth label="Address" id="address" value={item.address || ''}
                                       onChange={this.handleChange} autoComplete="address"/>
                            <TextField fullWidth label="City" id="city" value={item.city || ''}
                                       onChange={this.handleChange} autoComplete="address-level2"/>
                            <div>
                                <TextField className={classes.third} label="State/Province" id="stateOrProvince"
                                           value={item.stateOrProvince || ''}
                                           onChange={this.handleChange} autoComplete="address-level1"/>
                                <TextField className={classes.third} label="Country" id="country"
                                           value={item.country || ''}
                                           onChange={this.handleChange} autoComplete="country"/>
                                <TextField className={classes.third} label="Postal Code" id="postalCode"
                                           value={item.postalCode || ''}
                                           onChange={this.handleChange} autoComplete="postal-code"/>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <Button variant="contained" color="primary" type="submit">Save</Button>{' '}
                            <Button variant="contained" color="secondary" tag={Link} to="/groups">Cancel</Button>
                        </div>
                    </form>
                </Container>
            </div>
        );
    }
}

GroupEdit.propTypes = {}

function mapStateToProps(state) {
    return {
        item: state.groups.item
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroup: id => dispatch(loadGroup(id)),
        submitGroup: item => dispatch(submitGroup(item))
    };
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(GroupEdit));