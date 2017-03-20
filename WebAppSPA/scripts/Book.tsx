/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';

interface IBook {
    bookID: number
    authorID: number
    title: string   
    author: string
}

interface P {
    Book: IBook
}
interface S {
    Data: IBook
}

class Book extends React.Component<P, S>{

    constructor(props: P) {
        super(props);
        this.state = { Data: props.Book };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e: any) {
        //this.props.onRemove(this.state.data);
    }
    render() {
        return <tr>
            <td>
                <p>Title  <b>{this.state.Data.title}</b></p>
            </td>
            <td>
                <p>Author {this.state.Data.author}</p>
            </td>
            <td>
                <p><button onClick={this.onClick}>Delete</button></p>
            </td>
        </tr>;
        /*
        return <div>
            <p>Title  <b>{this.state.Data.title}</b></p>
            <p>Author {this.state.Data.author}</p>
            <p><button onClick={this.onClick}>Delete</button></p>
        </div>;
        */
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
        this.state = { bookID: 0, authorID: 0, title: "", author: "" };

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
                        value={this.state.author}
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
        this.onRemoveBook = this.onRemoveBook.bind(this);
    }
    // загрузка данных
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
    //[{"bookID":1,"authorID":1,"title":"book1","author":null},{"
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
    // удаление объекта
    onRemoveBook(book: IBook) {

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
    render() {
        //<PhoneForm onPhoneSubmit={this.onAddPhone} />
        var remove = this.onRemoveBook;
        return <div>
            <table class="table">
                <thead>
            <h2>Book list</h2>
                </thead>
                <tbody>
                {
                    this.state.Books.map(function (book) {

                        return <Book key={book.bookID} Book={book} />
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

//render(
  //  <PhonesList apiUrl="/api/values" />,
   // document.getElementById("content")
//);
