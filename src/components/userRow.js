import React from "react";
import Button from "react-bootstrap/Button";
import {Pen, Trash} from "react-bootstrap-icons";

const UserRow = (props) => {
    return (
        <tr>
            <td>{props.user.username}</td>
            <td>{props.user.firstName}</td>
            <td>{props.user.lastName}</td>
            <td>{props.user.birthDate.substring(0,10)}</td>
            <td>{props.user.email}</td>
            <td style={{textAlign: 'center'}}>
                <Button variant="outline-primary"
                        style={{padding: '4px 6px'}}
                        onClick={props.editUserHandler}>
                    <Pen size={24}/>
                </Button>
            </td>
            <td style={{textAlign: 'center'}}>
                <Button variant="outline-danger"
                        style={{padding: '4px 6px'}}
                        onClick={() => {props.deleteUserHandler(props.user._id)}}>
                    <Trash size={24}/>
                </Button>
            </td>
        </tr>
    );
}

export default UserRow;