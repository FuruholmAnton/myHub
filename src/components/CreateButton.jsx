
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
        this.ui = {};
        this.isOpen = false;
    }

    componentDidMount() {
        this.ui.optionsButtons = document.querySelectorAll('.createButton--options');

        vent.on('createButton:open', this.open);
        vent.on('createButton:close', this.close);

        this.tlRotateInMain = new TimelineMax({ paused: true });
        this.tlRotateInMain.to(this.plusIcon, 0.4, { rotation: 315, transformOrigin: '50% 50%', ease: Expo.easeOut });

        this.tlRotateOutMain = new TimelineMax({ paused: true });
        this.tlRotateOutMain.to(this.plusIcon, 0.2, { rotation: 0, transformOrigin: '50% 50%', ease: Power2.easeIn });
        this.tlRotateOutMain.call(() => {
            document.body.classList.remove('createButton-is-open');
        });

        this.tlOptionsIn = new TimelineMax({ paused: true });
        this.tlOptionsIn.call(() => {
            this.ui.optionsButtons.forEach(function(element) {
                element.style.visibility = 'visible';
            }, this);
        });
        this.tlOptionsIn.to(this.ui.optionsButtons, 0.5, { css: { opacity: 1, transform: 'translate(0)' } });

        this.tlOptionsOut = new TimelineMax({ paused: true });
        this.tlOptionsOut.to(this.ui.optionsButtons, 0.3, { y: 100, css: { opacity: 0, transform: 'translateY(100%)' } });
    }

    open() {
        document.body.classList.add('createButton-is-open');
        this.tlRotateInMain.restart();
        this.tlOptionsIn.restart();
        vent.emit('shadow:show');
        this.isOpen = true;
    }

    close() {
        const el = document.querySelector('.createButton_plusIcon');
        const _this = this;

        this.tlRotateOutMain.restart();
        this.tlOptionsOut.restart();

        if (document.body.classList.contains('shadow-is-visible')) {
            vent.emit('shadow:hide');
        }

        this.isOpen = false;
    }

    onClick() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    render() {
        return (
            <div className="createButton_container">
                {
                    this.props.options.map((item) => {
                        let key = Math.random();
                        return (<button className={'createButton createButton--options'} key={key}>test</button>);
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
