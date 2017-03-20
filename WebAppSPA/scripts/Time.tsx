// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/// <reference path="../../typings/modules/react/index.d.ts" />

import * as React from 'react';

interface P { }
interface S {
    seconds: number
}

class Time extends React.Component<P, S>{
    interval: number = 0;
    
    constructor(state:any) {
        super(state);
        this.state = {
            seconds: 0
        }
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
        return (
            <div></div>
           // <div>Seconds: {this.state.seconds}</div>
        );
    }
}

export { Time }