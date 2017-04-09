
import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        let list = props.list || [];
        this.state = {
            list: list,
        };

        if (props.closeMenuOnClick) {

        }

        // This binding is necessary to make `this` work in the callback
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

    }

    render() {
        console.log(this.props.list);

        return (
            <ul className="c-list">
                {
                    this.props.list.map((item) => {
                        let name = item.name || item.title;
                        let slug = item.slug || name;
                        if (!this.props.closeMenuOnClick) {
                            return (<Link to={item.path}
                                    className="c-list_item"
                                    key={slug}>{name}
                                </Link>);
                        } else {
                            return (<Link to={item.path}
                                    className="c-list_item"
                                    onClick={() => {
                                        vent.emit('menu:close');
                                    }}
                                    key={slug}>{name}
                                </Link>);
                        }
                    })
                }
            </ul>
        );
    }
}

List.propTypes = {
  list: React.PropTypes.array.isRequired,
  closeMenuOnClick: React.PropTypes.bool,
};
