import React,{Component} from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { updateBook } from '../services/CommonService';



const UpdateBookModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBook(props.book.id, e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
            props.onHide(); 
        },
        (error)=>{
            alert("Failed to Update Book");
        })
    };

    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Book Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="FirstName">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" required defaultValue={props.book.title} placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Email">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" name="author" required defaultValue={props.book.author} placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Course">
                                    <Form.Label>ISBN</Form.Label>
                                    <Form.Control type="text" name="isbn" required defaultValue={props.book.isbn} placeholder="" />
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


export default UpdateBookModal;