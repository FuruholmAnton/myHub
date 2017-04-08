
import React from 'react';
import {Link} from 'react-router';
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
        return (
            <ul className="c-list">
                {
                    this.state.list.map((item) => {
                        if (!this.props.closeMenuOnClick) {
                            return (<Link to={item.path}
                                    className="c-list_item"
                                    key={item.name}>{item.name}
                                </Link>);
                        } else {
                            return (<Link to={item.path}
                                    className="c-list_item"
                                    onClick={() => {
                                        vent.emit('menu:close');
                                    }}
                                    key={item.name}>{item.name}
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
