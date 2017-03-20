"use strict";
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
const React = require("react");
const react_dom_1 = require("react-dom");
const Message_1 = require("./Message");
class BaseGrid extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (<div>
                <Message_1.Message message="this is a grid"/>                
            </div>);
    }
}
exports.BaseGrid = BaseGrid;
react_dom_1.render(<BaseGrid />, document.getElementById('base-grid'));
//# sourceMappingURL=BaseGrid.jsx.map