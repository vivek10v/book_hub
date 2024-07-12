import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { getUsers, deleteUser } from '../services/CommonService';
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";

const Manage = () => {
    const [users, setUsers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editUser, setEditUser] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (users.length && !isUpdated) {
            return;
        }
        getUsers()
            .then(data => {
                if (mounted) {
                    setUsers(data);
                }
            })
        return () => {
            mounted = false;
            setIsUpdated(false);
        }
    }, [isUpdated, users])

    const handleUpdate = (e, usr) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditUser(usr);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, id) => {
        if (window.confirm('Are you sure ?')) {
            e.preventDefault();
            deleteUser(id)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                },
                    (error) => {
                        alert("Failed to Delete User");
                    })
        }
    };

    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);
    return (
        <div className="container-fluid side-container">
            <div className="row side-row" >
                <p id="manage"></p>
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((usr) =>

                            <tr key={usr.id}>
                                <td>{usr.id}</td>
                                <td>{usr.name}</td>
                                <td>{usr.email}</td>
                                <td>{usr.user_type}</td>
                                <td>

                                    <Button className="mr-2" variant="danger"
                                        onClick={event => handleDelete(event, usr.id)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Button className="mr-2"
                                        onClick={event => handleUpdate(event, usr)}>
                                        <FaEdit />
                                    </Button>
                                    <UpdateUserModal show={editModalShow} user={editUser} setUpdated={setIsUpdated}
                                        onHide={EditModelClose}></UpdateUserModal>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Add User
                    </Button>
                    <AddUserModal show={addModalShow} setUpdated={setIsUpdated}
                        onHide={AddModelClose}></AddUserModal>
                </ButtonToolbar>
            </div>
        </div>
    );

};



export default Manage;