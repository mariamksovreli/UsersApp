import React, {Component} from 'react';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class EditWindow extends Component {

    state = {
        id: null,
        username: "",
        firstName: "",
        lastName: "",
        birthDate: new Date(),
        email: ""
    }

    static getDerivedStateFromProps(props, current_state) {
        if (props.user !== null && current_state.id !== props.user._id) {
            return {
                id: props.user._id,
                username: props.user.username,
                firstName: props.user.firstName,
                lastName: props.user.lastName,
                birthDate: new Date(props.user.birthDate),
                email: props.user.email
            }
        }
        if (props.user === null) {
            return {
                id: null,
                username: "",
                firstName: "",
                lastName: "",
                birthDate: new Date(),
                email: ""
            }
        }
        return current_state;
    }

    onChangeUsername = (e) => {
        this.setState({username: e.target.value})
    }

    onChangeFirstName = (e) => {
        this.setState({firstName: e.target.value})
    }

    onChangeLastName = (e) => {
        this.setState({lastName: e.target.value})
    }

    onChangeBirthDate = (date) => {
        this.setState({birthDate: date})
    }

    onChangeEmail = (e) => {
        this.setState({email: e.target.value})
    }

    onUpdate = (e) => {
        e.preventDefault();
        const user = this.getUser();
        console.log(user);
        axios.post('http://localhost:5000/users/update/' + this.state.id, user)
            .then(res => {
                console.log(res.data);
                this.props.onHide();
                this.props.onSubmit();
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
    }

    onCreate = (e) => {
        e.preventDefault();
        const user = this.getUser();
        console.log(user);
        axios.post('http://localhost:5000/users/add/', user)
            .then(res => {
                console.log(res.data);
                this.props.onHide();
                this.props.onSubmit();
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
        this.props.onHide();
    }

    getUser = () => {
        return {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthDate: this.state.birthDate,
            email: this.state.email
        }
    }

    render() {
        let title = this.props.isEdit ? 'Edit User' : 'Add User';
        return (
            <Modal {...this.props} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <form onSubmit={this.props.isEdit ? this.onUpdate : this.onCreate}>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.username}
                                   onChange={this.onChangeUsername}
                                   disabled={(this.props.isEdit) ? "disabled" : ""}/>
                        </div>
                        <div className="form-group">
                            <label>First Name: </label>
                            <input type="text"
                                   required
                                   className="form-control"
                                   value={this.state.firstName}
                                   onChange={this.onChangeFirstName}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}/>
                        </div>
                        <div className="form-group">
                            <label>Birth Date: </label>
                            <div>
                                <DatePicker
                                    className="form-control"
                                    required
                                    selected={this.state.birthDate}
                                    onChange={this.onChangeBirthDate}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}/>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <input type="submit" value="Save changes" className="btn btn-primary"/>
                        {/*<Button variant="primary" onClick={this.props.isEdit ? this.onUpdate : this.onCreate}>Save changes</Button>*/}
                        <Button variant="secondary" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </form>
            </Modal>
        );
    }
}

export default EditWindow;

