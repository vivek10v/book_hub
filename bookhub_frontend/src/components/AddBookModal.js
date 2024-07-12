import React from 'react';
import { Modal, Col, Row, Form, Button } from 'react-bootstrap';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { addBook } from '../services/CommonService';


const AddBookModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(e.target)
            .then((result) => {
                alert(result);
                props.setUpdated(true);
                props.onHide(); 
            },
                (error) => {
                    alert("Failed to Add Book");
                })
    }

    return (
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Book Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="FirstName">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="Email">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" name="author" required placeholder="" />
                                </Form.Group>
                                <Form.Group controlId="Course">
                                    <Form.Label>Isbn</Form.Label>
                                    <Form.Control type="text" name="isbn" required placeholder="" />
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

export default AddBookModal;