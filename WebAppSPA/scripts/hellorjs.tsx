// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/// <reference path="../../typings/modules/react/index.d.ts" />
import React = require('react');

class Hello extends React.Component {
    render() {
        return <h1>Привет, React.JS</h1>;
    }
}
ReactDOM.render(
    <Hello />,
    document.getElementById("content")
);
