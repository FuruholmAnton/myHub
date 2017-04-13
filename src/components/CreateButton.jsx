
import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';

export default class CreateButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.onClick = this.onClick.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        vent.on('createButton:open', this.open);
        vent.on('createButton:close', this.close);

        this.tl = new TimelineMax();
    }

    open() {
        document.body.classList.add('createButton-is-open');
        this.tl.to(this.plusIcon, 0.2, { rotation: 225, transformOrigin: '50% 50%' });
        vent.emit('shadow:show');
    }

    close() {
        const el = document.querySelector('.createButton_plusIcon');
        this.tl.to(el, 0.2, { rotation: 0, transformOrigin: '50% 50%' });
        this.tl.call(()=>{
            document.body.classList.remove('createButton-is-open');
        });
    }

    onClick() {
        this.open();
    }

    render() {
        return (
            <div className="createButton_container">
                {
                    this.props.options.map((item) => {
                        let key = Math.random();
                        return (<button className={'createButton'} key={key}>test</button>);
                    })
                }
                <button className={'createButton createButton--main'}
                        onClick={this.onClick}
                        ref={(ref) => {this.mainButton = ref;}}>
                    <div className="createButton_plusIcon" ref={(ref) => { this.plusIcon = ref; }}>+</div>
                </button>
            </div>
        );
    }
}

CreateButton.propTypes = {
    options: React.PropTypes.array.isRequired,
};
