
import React from 'react';
import CreateButton from '../components/CreateButton';

export default class SingleNote extends React.Component {
    constructor(props) {
        super(props);

        this.keyUpTimer = null;
        this.id = props.params.id;

        this.onKeyUp = this.onKeyUp.bind(this);
        this.saveContent = this.saveContent.bind(this);
        this.onChangeTextArea = this.onChangeTextArea.bind(this);
        this.getContent = this.getContent.bind(this);

        this.state = {
            content: '',
            isDisabled: true,
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
    }

    getContent() {
        const _this = this;
        firebase.database().ref(`/notes/${this.id}/content`).once('value').then(function(note) {
            let n = note.val();
            _this.setState({
                content: n,
                isDisabled: false,
            });
        });
    }

    saveContent(content) {
        console.log('Saving note...', content);

        return firebase.database().ref(`/notes/${this.id}/content`).set(content).then((response)=>{
            console.log(response);
        });
    }

    onKeyUp(event) {
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

    render() {
        let textarea;
        if (this.state.isDisabled) {
            textarea = (<textarea className="singleNote_textarea"
                onKeyUp={this.onKeyUp}
                value={this.state.content}
                onChange={this.onChangeTextArea}
                disabled></textarea>);
        } else {
            textarea = (<textarea className="singleNote_textarea"
                onKeyUp={this.onKeyUp}
                value={this.state.content}
                onChange={this.onChangeTextArea}
                ></textarea>);
        }

        return (
            <div className="singleNote_content">
                {textarea}
                <CreateButton options={[1]}/>
            </div>
        );
    }
}
