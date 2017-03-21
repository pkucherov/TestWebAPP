/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';

interface IAuthor {
    authorID: number
    firstName: string
    lastName: string
}
//{ "bookID":1, "authorID":1, "title":"book1", "author":{ "authorID":1, "firstName":"First", "lastName":"Last" } }
interface IBook {
    bookID: number
    authorID: number
    title: string
    author: IAuthor
}

interface P {
    Book: IBook
    onDelete: any
    onEdit: any
}
interface S {
    Data: IBook
}

class Book extends React.Component<P, S>{

    constructor(props: P) {
        super(props);
        this.state = { Data: props.Book };
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }
    onClickEdit(e: any) {
        this.props.onEdit(this.state.Data);
    }
    onClickDelete(e: any) {
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

interface PPF {
    onBookSubmit: React.FormEventHandler
}
interface SPF {

}

class BookForm extends React.Component<PPF, IBook>{

    constructor(props: any) {
        super(props);
        let aut = { authorID: 0, firstName: "", lastName: "" }
        this.state = { bookID: 0, title: "", authorID: 0, author: aut };

        this.onSubmit = this.onSubmit.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
    }

    onTitleChange(e: React.FormEvent) {
        // this.setState({ name: e.target.value });
    }
    onAuthorChange(e: React.FormEvent) {
        // this.setState({ price: e.target.value });
    }
    onSubmit(e: React.FormEvent) {
        e.preventDefault();
        var bookTitle = this.state.title.trim();

        if (!bookTitle) {
            return;
        }
        // this.props.onBookSubmit({ name: bookTitle });
        // this.setState({ name: "", price: 0 });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Book Title"
                        value={this.state.title}
                        onChange={this.onTitleChange} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Author"
                        value={this.state.author.firstName + this.state.author.lastName}
                        onChange={this.onAuthorChange} />
                </p>
                <input type="submit" value="Save" />
            </form>
        );
    }
}


interface PPL {
    apiUrl: string
}
interface SPL {
    Books: IBook[]
}
class BookList extends React.Component<PPL, SPL>{

    constructor(props: any) {
        super(props);
        this.state = { Books: [] };

        this.onAddBook = this.onAddBook.bind(this);
        this.onDeleteBook = this.onDeleteBook.bind(this);
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data: IBook[] = JSON.parse(xhr.responseText);          
            this.setState({ Books: data });            
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    //[{"bookID":1,"authorID":1,"title":"book1","author":null},{"
    //[{"bookID":1,"authorID":1,"title":"book1","author":{"authorID":1,"firstName":"First","lastName":"Last"}}"
    onAddBook(book: IBook) {
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
    onEditBook(book: IBook) {

    }
    onDeleteBook(book: IBook) {
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
    onClickAdd()
    {
        console.log("onClickAdd")
    }
    render() {
        //<PhoneForm onPhoneSubmit={this.onAddPhone} />
        let del = this.onDeleteBook;
        let edit = this.onEditBook;
        return <div>
            <p><button onClick={this.onClickAdd}>Create Book</button></p>
            <table class="table">
                <thead>
                    <p>Book list</p>
                </thead>
                <tbody>
                    {
                        this.state.Books.map(function (book) {

                            return <Book key={book.bookID} Book={book} onDelete={del} onEdit={edit} />
                        })
                    }
                </tbody>
            </table>
        </div>;
        /*return <div>
            <h2>Book list</h2>
            <div>
                {
                    this.state.Books.map(function (book) {

                        return <Book key={book.bookID} Book={book} />
                    })
                }
            </div>
        </div>;
        */
        /*
         return <div>
                <PhoneForm onPhoneSubmit={this.onAddPhone} />
                <h2>Book list</h2>
                <div>
                    {
                    this.state.phones.map(function(phone){

                    return <Phone key={phone.id} phone={phone} onRemove={remove} />
                    })
                    }
                </div>
        </div>;
        <div>
            {
                this.state.phones.map(function (phone) {

                    return <Phone key={phone.id} phone={phone} onRemove={remove} />
                })
            }
        </div>*/
    }
}

export { BookList }