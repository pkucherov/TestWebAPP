// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/modules/react-dom/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import { Message } from './Message';
import { Time } from './Time';

interface PG { }
interface SG { }

class BaseGrid extends React.Component<PG, SG>{

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Message message="this is a grid" />                
            </div>
        );
    }
}

render(<BaseGrid />, document.getElementById('base-grid'));

export { BaseGrid }