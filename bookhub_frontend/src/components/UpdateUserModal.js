import React, { Component } from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { updateUser } from '../services/CommonService';



const UpdateUserModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(props.user.id, e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
                props.onHide(); 
            },
                (error) => {
                    alert("Failed to Update User");
                })
    };

    return (
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update User Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="FirstName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" required defaultValue={props.user.name} placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="Email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="email" required defaultValue={props.user.email} placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="Course">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Librarian"
                                        name="user_type"
                                        value="librarian"
                                        required
                                        defaultChecked={props.user.user_type === 'librarian'}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Patron"
                                        name="user_type"
                                        value="patron"
                                        required
                                        defaultChecked={props.user.user_type === 'patron'}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateUserModal;