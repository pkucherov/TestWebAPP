/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';

interface phone
{
    id: string
    name: string
    price: string
}

interface P {    
    phone: phone
    onRemove: any
}
interface S {
    data: phone
}

class Phone extends React.Component <P, S>{

    constructor(props: any) {
        super(props);
        this.state = { data: props.phone };
        this.onClick = this.onClick.bind(this);
    }
    onClick(e:any) {
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

interface PPF {
    onPhoneSubmit: any
}
interface SPF {
  
}

class PhoneForm extends React.Component <PPF, phone>{

    constructor(props: any) {
        super(props);
        this.state = { id: "", name: "", price: "0" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
    }
    
    onNameChange(e: React.FormEvent) {
        this.setState({ id: "", name: (e.target as any).value , price: ""});
    }
    onPriceChange(e: React.FormEvent) {
        this.setState({id: "", name: name, price: (e.target as any).value });
    }
    onSubmit(e: React.FormEvent) {
        e.preventDefault();
        var phoneName = this.state.name.trim();
        var phonePrice = this.state.price;
        if (!phoneName /*|| phonePrice <= 0*/) {
            return;
        }
        this.props.onPhoneSubmit({ name: phoneName, price: phonePrice });
        this.setState({ id:"", name: "", price: "" });
    }
    
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                        placeholder="Модель телефона"
                        value={this.state.name}
                        onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="number"
                        placeholder="Цена"
                        value={this.state.price}
                        onChange={this.onPriceChange} />
                </p>
                <input type="submit" value="Сохранить" />
            </form>
        );
    }
}


interface PPL {
    apiUrl: string
}
interface SPL {
    phones: phone[]
}
class PhonesList extends React.Component <PPL, SPL>{

    constructor(props:any) {
        super(props);
        this.state = { phones: [] };

        this.onAddPhone = this.onAddPhone.bind(this);
        this.onRemovePhone = this.onRemovePhone.bind(this);
    }
    // загрузка данных
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
    // добавление объекта
    onAddPhone(phone:phone) {
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
    // удаление объекта
    onRemovePhone(phone:phone) {

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
            <PhoneForm onPhoneSubmit={this.onAddPhone} />
            <h2>Phone list</h2>
            <div>
                {
                    this.state.phones.map(function (phone) {

                        return <Phone key={phone.id} phone={phone} onRemove={remove}/>
                    })
                }
            </div>            
        </div>;
        /*
         return <div>
                <PhoneForm onPhoneSubmit={this.onAddPhone} />
                <h2>Список смартфонов</h2>
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

export { PhonesList }

//render(
  //  <PhonesList apiUrl="/api/values" />,
   // document.getElementById("content")
//);
