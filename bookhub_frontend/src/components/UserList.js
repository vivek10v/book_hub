import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Table } from 'react-bootstrap';
import { getUsers, deleteUser, getList } from '../services/CommonService';
import "../App.css";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editUser, setEditUser] = useState([]);
    const [isUpdated, setIsUpdated] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const getUser = "/users"


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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // useEffect(() => {
    //     let mounted = true;
    //     getUsers()
    //         .then(data => {
    //             if (mounted) {
    //                 setUsers(data)
    //             }
    //         })
    //     return () => mounted = false;
    // }, [])

    useEffect(() => {
        if (isUpdated) {
            let mounted = true;
            getList(getUser)
                .then(data => {
                    if (mounted) {
                        setUsers(data)
                        setIsUpdated(false);
                    }
                })
            return () => mounted = false;
        }
    }, [isUpdated])

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);


    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-fluid side-container">
            <div className="row side-row" >
                <p id="before-table"></p>
                <input
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-3"
                />
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((usr, index) =>
                            <tr key={usr.id}>
                                <td>{indexOfFirstUser + index + 1}</td>
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
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button onClick={handlePrevPage} className="page-link" disabled={currentPage === 1}>
                                Previous
                            </button>
                        </li>
                        {pageNumbers.map(number => (
                            <li key={number} className="page-item">
                                <button onClick={() => paginate(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button onClick={handleNextPage} className="page-link" disabled={currentPage === pageNumbers.length}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Users;