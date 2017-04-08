
import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

    }

    render() {
        return (
            <ul className="c-list">
                {
                    this.props.list.map((item) => {
                        return <li className="c-list_item" key={item.name}>list item {item.name}</li>;
                    })
                }
            </ul>
        );
    }
}