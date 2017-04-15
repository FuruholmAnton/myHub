
import React from 'react';
// import { Link } from 'react-router';
import vent from 'Core/eventEmitter.js';

export default class CreateButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        // This binding is necessary to make `this` work in the callback
        this.onOptionClick = this.onOptionClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.createNote = this.createNote.bind(this);

        this.ui = {};
        this.isOpen = false;
        this.optionButtons = [];
    }

    componentDidMount() {
        const _this = this;
        this.ui.optionsButtons = document.querySelectorAll('.createButton--options');


        vent.on('createButton:open', this.open);
        vent.on('createButton:close', this.close);

        this.tlRotateInMain = new TimelineMax({ paused: true });
        this.tlRotateInMain.to(this.plusIcon, 0.6, { rotation: 225, transformOrigin: '50% 50%', ease: Expo.easeOut });

        this.tlRotateOutMain = new TimelineMax({ paused: true });
        this.tlRotateOutMain.to(this.plusIcon, 0.2, { rotation: 360, transformOrigin: '50% 50%', ease: Power2.easeIn });
        this.tlRotateOutMain.call(() => {
            document.body.classList.remove('createButton-is-open');
        });

        this.tlOptionsIn = new TimelineMax({ paused: true, delay: 0.5 });
        this.tlOptionsIn.fromTo(this.optionButtons, 0.5, { rotation: -45, transformOrigin: '50% 50%', y: '100%', opacity: 0 }, { rotation: 0, transformOrigin: '20% 80%', y: '0%', opacity: 1, visibility: 'visible' });

        this.tlOptionsOut = new TimelineMax({ paused: true });
        this.tlOptionsOut.to(this.ui.optionsButtons, 0.3, { y: '-30%', opacity: 0 });
    }

    open() {
        document.body.classList.add('createButton-is-open');
        this.tlRotateInMain.restart();
        this.tlOptionsIn.restart();
        vent.emit('shadow:show');
        this.isOpen = true;
    }

    close() {
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

    onOptionClick(e) {
        const el = e.currentTarget;
        const type = el.dataset.type;

        switch (type) {
            case 'note':
                this.createNote();
                break;

            default:
                break;
        }
    }

    createNote() {
        let newNoteKey = firebase.database().ref().child('notes').push().key;
        let userId = firebase.auth().currentUser.uid;

        const note = {
            title: 'New note',
            content: '',
        };

        const user = {

        };

        return firebase.database().ref(`/notes/${newNoteKey}`).set(note).then((response) => {
            console.log('Created note: ', response);
            return firebase.database().ref(`/users/${userId}/notes/${newNoteKey}`).set(true).then((response) => {
                console.log('Added note to user: ', response);
                vent.emit('notes:fetch');
            });
        });
    }

    render() {
        const button = (
            <div className="createButton_container">
            {
                this.props.options.map((item) => {
                    return (<button className={'createButton createButton--options'}
                        title={item.title}
                        data-type={item.type}
                        onClick={this.onOptionClick}
                        key={item.type}
                        ref={(ref) => { this.optionButtons.push(ref); }}>{item.content}</button>);
                })
            }
            <button className={'createButton createButton--main'}
                onClick={this.onClick}
                ref={(ref) => { this.mainButton = ref; }}>
                <div className="createButton_plusIcon" ref={(ref) => { this.plusIcon = ref; }}>+</div>
            </button>
        </div>);

        /* Cleans up the array */
        this.optionButtons = Array.from(this.optionButtons).filter((el) => {
            if (this.optionButtons.includes(el) || el == null) return false;
            return true;
        }, this);

        return button;
    }
}

CreateButton.propTypes = {
    options: React.PropTypes.array.isRequired,
};
