// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

/// <reference path="../../typings/modules/react/index.d.ts" />
/// <reference path="../../typings/globals/marked/index.d.ts" />
import * as React from 'react';

interface P {
    author: string
}
interface S { }

class Comment extends React.Component<P, S>{
    constructor(props: any) {
        super(props);
    }

    rawMarkup() {
        var rawMarkup = marked(
            this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }

    render() {
        //<span dangerouslySetInnerHTML={this.rawMarkup()} />
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>                               
            </div>
        );
    }
}

export { Comment }