import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Table} from "react-bootstrap";
import axios from "axios";
import UserRow from "./userRow";
import EditWindow from "./editWindow";

class UsersComponent extends Component {

    state = {
        users: [],
        error: false,
        showWindow: false,
        isEdit: false,
        userToEdit: null
    }

    componentDidMount() {
        this.loadData();
    }

    deleteUserHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete('http://localhost:5000/users/' + id)
                .then(res => console.log(res.data));

            this.setState({
                users: this.state.users.filter(u => u._id !== id)
            });
        }
    }

    showEditWindowHandler = (isEdit, userToEdit) => {
        this.setState({showWindow: true, isEdit: isEdit, userToEdit: userToEdit})
    }

    closeEditWindowHandler = () => {
        this.setState({showWindow: false})
    }

    loadData = () => {
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({users: res.data});
            })
            .catch(err => {
                this.setState({error: true});
            });
    }

    renderRows = (user, key) => {
        return (
            <UserRow user={user} key={key} deleteUserHandler={this.deleteUserHandler} editUserHandler={() => this.showEditWindowHandler(true, user)}/>
        );
    }

    render() {
        return (
            <div>
                <Button variant="primary" style={{margin: '8px 0px'}} onClick={() => this.showEditWindowHandler(false, null)}>Add User</Button>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth date</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(this.renderRows)}
                    </tbody>
                </Table>
                <EditWindow show={this.state.showWindow}
                            isEdit={this.state.isEdit}
                            user={this.state.userToEdit}
                            onHide={this.closeEditWindowHandler}
                            onSubmit={this.loadData}/>
            </div>
        );
    }
}

export default UsersComponent;