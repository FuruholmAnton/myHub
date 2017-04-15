
import React from 'react';
import vent from 'Core/eventEmitter.js';

export default class SingleNote extends React.Component {
    constructor(props) {
        super(props);

        this.keyUpTimer = null;
        this.id = props.params.id;
        this.ui = {};

        this.onContentKeyUp = this.onContentKeyUp.bind(this);
        this.onTitleKeyUp = this.onTitleKeyUp.bind(this);
        this.saveContent = this.saveContent.bind(this);
        this.onChangeTextArea = this.onChangeTextArea.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getTitle = this.getTitle.bind(this);

        this.state = {
            'content': '',
            'isDisabled': true,
            'title': '',
            'isEditable': false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.id != nextProps['data-id']) {
            this.id = nextProps['data-id'];
            this.setState({
                content: '',
                isDisabled: true,
            });
            this.getContent();
        }
    }

    componentDidMount() {
        this.getContent();
        this.getTitle();
    }

    componentWillUnmount() {
        this.saveContent();
        vent.emit('note:saveTitle');
    }

    getContent() {
        const _this = this;
        firebase.database().ref(`/notes/${this.id}/content`).once('value').then(function(note) {
            let n = note.val();
            _this.setState({
                content: n || '',
                isDisabled: false,
            });
        });
    }

    getTitle() {
        const _this = this;
        firebase.database().ref(`/notes/${this.id}/title`).once('value').then(function(note) {
            let n = note.val();
            console.log(n);

            _this.setState({
                title: n,
                isEditable: true,
            });
        });
    }

    saveContent(content = this.ui.content.textContent) {
        console.log('Saving note...', content);

        return firebase.database().ref(`/notes/${this.id}/content`).set(content).then((response)=>{
            console.log(response);
        });
    }

    onContentKeyUp(event) {
        event.preventDefault();
        const text = event.target.textContent;

        clearTimeout(this.keyUpTimer);
        this.keyUpTimer = setTimeout(function() {
            this.saveContent(text);
        }.bind(this), 2000);
    }

    onChangeTextArea(event) {
        this.setState({ content: event.target.value });
    }

    saveTitle(name = this.ui.title.textContent) {
        console.log('Saving title...', name);

        return firebase.database().ref(`/notes/${this.id}/title`).set(name).then((response) => {
            console.log(response);
        });
    }

    onTitleKeyUp(event) {
        event.preventDefault();
        const text = event.target.textContent;

        clearTimeout(this.keyUpTimer);
        this.keyUpTimer = setTimeout(function() {
            this.saveTitle(text);
        }.bind(this), 2000);
    }

    onChangeTitle(event) {
        this.setState({ title: event.target.textContent });
    }

    render() {
        let textarea;
        /* Placeholders */
        if (this.state.isDisabled) {
            textarea = (<textarea className="singleNote_textarea"
                onKeyUp={this.onContentKeyUp}
                value={this.state.content}
                onChange={this.onChangeTextArea}
                disabled></textarea>);
        } else {
            textarea = (<textarea className="singleNote_textarea"
                onKeyUp={this.onContentKeyUp}
                value={this.state.content}
                onChange={this.onChangeTextArea}
                ></textarea>);
        }

        return (
            <div className="singleNote">
                <h1 className="singleNote_title"
                    contentEditable={this.state.isEditable}
                    onChange={this.onChangeTitle}
                    onKeyUp={this.onTitleKeyUp}
                    ref={(ref) => { this.ui.title = ref; }}
                    role="textbox">
                    {this.state.title}
                </h1>
                <div className="singleNote_content" ref={(ref) => { this.ui.content = ref; }}>
                    {textarea}
                </div>
            </div>
        );
    }
}
