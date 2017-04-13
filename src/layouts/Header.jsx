import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isToggleOn': true,
      'isChildView': false,
      'back-url': '',
      'title': '',
      'isEditable': false,
    };

    this.id = props['data-id'] || undefined;

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.getTitle = this.getTitle.bind(this);

    // vent.on('route:changed', this.setBackURL);
  }

  componentWillReceiveProps(nextProps) {
    if (this.id != nextProps['data-id']) {
      this.id = nextProps['data-id'];
      this.setState({
        title: '',
      });
      this.getTitle();
    }
  }

  componentDidMount() {
    this.getTitle();
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

  toggleMenu(e) {
    e.preventDefault();
    console.log('Click');
    vent.emit('menu:toggle');
    vent.emit('shadow:toggle');
  }

  saveTitle(name) {
    console.log('Saving title...', name);

    return firebase.database().ref(`/notes/${this.id}/title`).set(name).then((response) => {
      console.log(response);
    });
  }

  onKeyUp(event) {
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
    return (
      <header className="header js-header">
        <Link to={'/' + this.props['back-url']} className={'header_backButton'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          {this.props['back-name'] || 'myHub'}
        </Link>

        <button onClick={this.toggleMenu} className="header_hamburgerIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        <div className="header_hero">
          { this.props.slug == 'single-note' ? (
            <h1 className="header_title"
                contentEditable={this.state.isEditable}
                onChange={this.onChangeTitle}
                onKeyUp={this.onKeyUp}
                role="textbox">
              {this.state.title}
            </h1>
          ) : (
              <h1 className="header_title">{this.props.title}</h1>
          ) }
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string,
};
