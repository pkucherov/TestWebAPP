// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
"use strict";
/// <reference path="../../typings/modules/react/index.d.ts" />
const React = require("react");
class Time extends React.Component {
    constructor(state) {
        super(state);
        this.interval = 0;
        this.state = {
            seconds: 0
        };
    }
    /*
    updateTick = () => {
        const sec = this.state.seconds + 1;

        this.setState({
            seconds: sec
        });
    }
    */
    componentDidMount() {
        //this.interval = setInterval(this.updateTick, 1000);
    }
    componentWillUnmount() {
        //clearInterval(this.interval);
    }
    render() {
        return (<div></div>);
    }
}
exports.Time = Time;
//# sourceMappingURL=Time.jsx.map