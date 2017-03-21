"use strict";
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
const React = require("react");
class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Data: props.Book };
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    onClickEdit(e) {
        this.props.onEdit(this.state.Data);
    }
    onClickDelete(e) {
        this.props.onDelete(this.state.Data);
    }
    render() {
        return <tr>
            <td>
                <p>Title  <b>{this.state.Data.title}</b></p>
            </td>
            <td>
                <p>Author {this.state.Data.author.firstName + this.state.Data.author.lastName}</p>
            </td>
            <td>
                <p><button onClick={this.onClickEdit}>Edit</button></p>
            </td>
            <td>
                <p><button onClick={this.onClickDelete}>Delete</button></p>
            </td>
        </tr>;
    }
}
class BookForm extends React.Component {
    constructor(props) {
        super(props);
        let aut = { authorID: 0, firstName: "", lastName: "" };
        this.state = { bookID: 0, title: "", authorID: 0, author: aut };
        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
    }
    onTitleChange(e) {
        // this.setState({ name: e.target.value });
    }
    onAuthorChange(e) {
        // this.setState({ price: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var bookTitle = this.state.title.trim();
        if (!bookTitle) {
            return;
        }
        // this.props.onBookSubmit({ name: bookTitle });
        // this.setState({ name: "", price: 0 });
    }
    render() {
        return (<form onSubmit={this.onSubmit}>
                <p>
                    <input type="text" placeholder="Book Title" value={this.state.title} onChange={this.onTitleChange}/>
                </p>
                <p>
                    <input type="text" placeholder="Author" value={this.state.author.firstName + this.state.author.lastName} onChange={this.onAuthorChange}/>
                </p>
                <input type="submit" value="Save"/>
            </form>);
    }
}
class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Books: [], IsShowCreate: false };
        this.onAddBook = this.onAddBook.bind(this);
        this.onDeleteBook = this.onDeleteBook.bind(this);
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ Books: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    //[{"bookID":1,"authorID":1,"title":"book1","author":{"authorID":1,"firstName":"First","lastName":"Last"}}"
    onAddBook(book) {
        if (book) {
            var data = JSON.stringify({ "bookID": book.bookID, "title": book.title, "author": book.author });
            var xhr = new XMLHttpRequest();
            xhr.open("post", this.props.apiUrl, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send(data);
        }
    }
    onEditBook(book) {
    }
    onDeleteBook(book) {
        console.log("onDeleteBook");
        if (book) {
            var url = this.props.apiUrl + "/" + book.bookID;
            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status == 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    onClickAdd() {
        console.log("onClickAdd");
        //  this.setState({ IsShowCreate: true })
    }
    render() {
        let del = this.onDeleteBook;
        let edit = this.onEditBook;
        let createForm = (<div> </div>);
        if (this.state.IsShowCreate) {
            createForm = (<div>
                    <BookForm onBookSubmit={this.onAddBook}/>
                </div>);
        }
        return <div>
            <p><button onClick={this.onClickAdd}>Create Book</button></p>       
            {createForm}
            <table class="table">
                <thead>
                    <p>Book list</p>
                </thead>
                <tbody>
                    {this.state.Books.map(function (book) {
            return <Book key={book.bookID} Book={book} onDelete={del} onEdit={edit}/>;
        })}
                </tbody>
            </table>
        </div>;
    }
}
exports.BookList = BookList;
//# sourceMappingURL=Book.jsx.map