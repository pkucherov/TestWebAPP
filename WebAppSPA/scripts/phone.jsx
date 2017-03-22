"use strict";
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
const React = require("react");
class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.phone };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
            <p><b>{this.state.data.name}</b></p>
            <p>Price {this.state.data.price}</p>   
            <p><button onClick={this.onClick}>Delete</button></p>
        </div>;
    }
}
class PhoneForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: "", name: "", price: "0" };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ id: "", name: e.target.value, price: "" });
    }
    onPriceChange(e) {
        this.setState({ id: "", name: name, price: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var phoneName = this.state.name.trim();
        var phonePrice = this.state.price;
        if (!phoneName /*|| phonePrice <= 0*/) {
            return;
        }
        this.props.onPhoneSubmit({ name: phoneName, price: phonePrice });
        this.setState({ id: "", name: "", price: "" });
    }
    render() {
        return (<form onSubmit={this.onSubmit}>
                <p>
                    <input type="text" placeholder="Phone" value={this.state.name} onChange={this.onNameChange}/>
                </p>
                <p>
                    <input type="number" placeholder="Price" value={this.state.price} onChange={this.onPriceChange}/>
                </p>
                <input type="submit" value="Save"/>
            </form>);
    }
}
class PhonesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { phones: [] };
        this.onAddPhone = this.onAddPhone.bind(this);
        this.onRemovePhone = this.onRemovePhone.bind(this);
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ phones: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    onAddPhone(phone) {
        if (phone) {
            var data = JSON.stringify({ "name": phone.name, "price": phone.price });
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
    onRemovePhone(phone) {
        if (phone) {
            var url = this.props.apiUrl + "/" + phone.id;
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
        var remove = this.onRemovePhone;
        return <div>      
            <PhoneForm onPhoneSubmit={this.onAddPhone}/>
            <h2>Phone list</h2>
            <div>
                {this.state.phones.map(function (phone) {
            return <Phone key={phone.id} phone={phone} onRemove={remove}/>;
        })}
            </div>            
        </div>;
    }
}
exports.PhonesList = PhonesList;
//# sourceMappingURL=phone.jsx.map