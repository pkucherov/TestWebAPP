"use strict";
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../../typings/modules/react/index.d.ts" />
const React = require("react");
class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<p>
                {this.props.message}
            </p>);
    }
}
exports.Message = Message;
//# sourceMappingURL=Message.jsx.map