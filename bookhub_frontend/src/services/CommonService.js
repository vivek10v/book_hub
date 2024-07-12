import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000";

export function getUsers() {
    return axios.get('http://127.0.0.1:8000/users/')
        .then(response => response.data)
}

export function deleteUser(id) {
    return axios.delete('http://127.0.0.1:8000/user/' + id + '/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

export function addUser(user) {
    return axios.post('http://127.0.0.1:8000/users/', {
        //   id:null,
        name: user.name.value,
        email: user.email.value,
        user_type: user.user_type.value
    })
        .then(response => response.data)
}

export function updateUser(id, user) {
    return axios.put('http://127.0.0.1:8000/user/' + id + '/', {
        name: user.name.value,
        email: user.email.value,
        user_type: user.user_type.value
    })
        .then(response => response.data)
}



export function getBooks() {
    return axios.get('http://127.0.0.1:8000/books/')
        .then(response => response.data)
}

export function deleteBook(id) {
    return axios.delete('http://127.0.0.1:8000/book/' + id + '/', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

export function addBook(book) {
    return axios.post('http://127.0.0.1:8000/books/', {
        //   id:null,
        title: book.title.value,
        author: book.author.value,
        isbn: book.isbn.value
    })
        .then(response => response.data)
}

export function updateBook(id, book) {
    return axios.put('http://127.0.0.1:8000/book/' + id + '/', {
        title: book.title.value,
        author: book.author.value,
        isbn: book.isbn.value
    })
        .then(response => response.data)
}





export function getList(url) {    
    const apiUrl = `${baseUrl}`+`${url}/`;
    console.log(apiUrl)
    return axios.get(apiUrl)
        .then(response => response.data)
}

export function deleteObj(url, id) {
    const apiUrl = `${baseUrl}`+`${url}/${id}/`;
    return axios.delete(apiUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
}

export function addObj(url, obj) {
    const apiUrl = `${baseUrl}`+`${url}/`;
    return axios.post(apiUrl, {
        //   id:null,
        obj
    })
        .then(response => response.data)
}

export function updateObj(url, id, obj) {
     const apiUrl = `${baseUrl}`+`${url}/${id}/`;
    return axios.put(apiUrl, {
       obj
    })
        .then(response => response.data)
}
