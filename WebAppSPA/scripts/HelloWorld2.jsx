"use strict";
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
const React = require("react");
const react_dom_1 = require("react-dom");
const Message_1 = require("./Message");
const Time_1 = require("./Time");
//import { BaseGrid } from './BaseGrid';
const commrt_1 = require("./commrt");
const phone_1 = require("./phone");
class BaseGrid88 extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div>                
                <Message_1.Message message="this is a grid456"/>
                <Time_1.Time />                
            </div>);
    }
}
class GridHead extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>
                <Message_1.Message message={this.props.Title}/>
            </div>);
    }
}
class HelloWorld2 extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div>      
                <commrt_1.Comment author={'Jon Smith'}>
                    "This is a **bold** comment"
                </commrt_1.Comment> 
                <Message_1.Message message="Hello World!1123478"/>
                <Time_1.Time />                
            </div>);
    }
}
react_dom_1.render(<HelloWorld2 />, document.getElementById('hello-world-content'));
react_dom_1.render(<div>Bonjour!123</div>, document.getElementById('container'));
react_dom_1.render(<div>Bonjour!14</div>, document.getElementById('container2'));
react_dom_1.render(<div>Bonjour!35</div>, document.getElementById('container3'));
//render(<BaseGrid88 />, document.getElementById('container4'));
react_dom_1.render(<phone_1.PhonesList apiUrl="/api/values"/>, document.getElementById("container5"));
//# sourceMappingURL=HelloWorld2.jsx.map