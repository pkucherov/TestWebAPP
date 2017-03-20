// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../../typings/modules/react/index.d.ts" />
import * as React from 'react';

interface P {
    message: string
}
interface S { }

class Message extends React.Component<P, S>{

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <p>
                {this.props.message}
            </p>
        );
    }

}

export { Message };