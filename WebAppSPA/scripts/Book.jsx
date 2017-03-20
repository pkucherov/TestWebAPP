"use strict";
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
const React = require("react");
class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Data: props.Book };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        //this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
            <p>Title  <b>{this.state.Data.title}</b></p>
            <p>Author {this.state.Data.author}</p>
            <p><button onClick={this.onClick}>Delete</button></p>
        </div>;
    }
}
class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bookID: 0, authorID: 0, title: "", author: "" };
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
                    <input type="text" placeholder="Author" value={this.state.author} onChange={this.onAuthorChange}/>
                </p>
                <input type="submit" value="Save"/>
            </form>);
    }
}
class BookList extends React.Component {
    constructor(props) {
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
    // удаление объекта
    onRemoveBook(book) {
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
            <h2>Book list</h2>
            <div>
                {this.state.Books.map(function (book) {
            return <Book key={book.bookID} Book={book}/>;
        })}
            </div>
        </div>;
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
exports.BookList = BookList;
//render(
//  <PhonesList apiUrl="/api/values" />,
// document.getElementById("content")
//);
//# sourceMappingURL=Book.jsx.map