"use strict";
/// <reference path="../../typings/modules/react/index.d.ts" />
const React = require("react");
class HelloMessage extends React.Component {
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}
module.exports = HelloMessage;
//# sourceMappingURL=HelloWorld.jsx.map