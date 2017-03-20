// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import { Message } from './Message';
import { Time } from './Time';
//import { BaseGrid } from './BaseGrid';
import { Comment } from './commrt';
import { PhonesList } from './phone';

interface MovieData {
    ID: number
    Title: string
    ReleaseDate: string
    Genre: string
    Price: number
}

interface PG { }
interface SG { }

class BaseGrid88 extends React.Component<MovieData, SG>{

    constructor() {
        super();
    }

    render() {
        return (           
            <div>                
                <Message message="this is a grid456" />
                <Time />                
            </div>
        );
    }
}


interface PHG { }
interface SHG{ }

class GridHead extends React.Component<MovieData, SHG>{

    constructor(props: MovieData) {
        super(props);
    }

    render() {
        return (
            <div>
                <Message message={this.props.Title} />
            </div>
        );
    }
}


interface P { }
interface S { }

class HelloWorld2 extends React.Component<P, S>{

    constructor() {
        super();
    }

    render() {
        return (
            <div>      
                <Comment author={'Jon Smith'}>
                    "This is a **bold** comment"
                </Comment> 
                <Message message="Hello World!1123478" />
                <Time />                
            </div>
        );
    }
}


render(<HelloWorld2 />, document.getElementById('hello-world-content'));

render(<div>Bonjour!123</div>, document.getElementById('container'));
render(<div>Bonjour!14</div>, document.getElementById('container2'));
render(<div>Bonjour!35</div>, document.getElementById('container3'));
//render(<BaseGrid88 />, document.getElementById('container4'));
render(<PhonesList apiUrl="/api/values" />,  document.getElementById("container5"));