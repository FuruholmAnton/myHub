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
    };

    // vent.on('route:changed', this.setBackURL);
  }

  toggleMenu(e) {
    e.preventDefault();
    console.log('Click');
    vent.emit('menu:toggle');
    vent.emit('shadow:toggle');
  }

  // setBackURL() {
  //   this.setState({
  //     'back-url': '',
  //   });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Header update', this.props);

  //   /* this.setState({
  //     backURL: this.props.routes[this.props.routes.length - 1],
  //   });*/
  // }


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
          <h1>{this.props.title}</h1>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string,
};
