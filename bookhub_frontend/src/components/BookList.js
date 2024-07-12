import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Table } from 'react-bootstrap';
import { getBooks, deleteBook } from '../services/CommonService';
import "../App.css";
import AddBookModal from "./AddBookModal";
import UpdateBookModal from "./UpdateBookModal";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editBook, setEditBook] = useState([]);
    const [isUpdated, setIsUpdated] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;


    const handleUpdate = (e, book) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditBook(book);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, id) => {
        if (window.confirm('Are you sure ?')) {
            e.preventDefault();
            deleteBook(id)
                .then((result) => {
                    alert(result);
                    setIsUpdated(true);
                },
                    (error) => {
                        alert("Failed to Delete Book");
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
        if (currentPage < Math.ceil(filteredBooks.length / booksPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        if (isUpdated) {
            let mounted = true;
            getBooks()
                .then(data => {
                    if (mounted) {
                        setBooks(data)
                        setIsUpdated(false);
                    }
                })
            return () => mounted = false;
        }
    }, [isUpdated])

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);


    let AddModelClose = () => setAddModalShow(false);
    let EditModelClose = () => setEditModalShow(false);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBooks.length / booksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-fluid side-container">
            <div className="row side-row" >
                <p id="before-table"></p>
                <input
                    type="text"
                    placeholder="Search Books"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-3"
                />
                <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book, index) =>
                            <tr key={book.id}>
                                <td>{indexOfFirstBook + index + 1}</td>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.isbn}</td>
                                <td>
                                    <Button className="mr-2" variant="danger"
                                        onClick={event => handleDelete(event, book.id)}>
                                        <RiDeleteBin5Line />
                                    </Button>
                                    <span>&nbsp;&nbsp;&nbsp;</span>
                                    <Button className="mr-2"
                                        onClick={event => handleUpdate(event, book)}>
                                        <FaEdit />
                                    </Button>
                                    <UpdateBookModal show={editModalShow} book={editBook} setUpdated={setIsUpdated}
                                        onHide={EditModelClose}></UpdateBookModal>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={handleAdd}>
                        Add Book
                    </Button>
                    <AddBookModal show={addModalShow} setUpdated={setIsUpdated}
                        onHide={AddModelClose}></AddBookModal>
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

export default Books;