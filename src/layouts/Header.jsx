import React from 'react';
import vent from '../core/eventEmitter.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

  }

  toggleMenu(e) {
    e.preventDefault();
    console.log('Click');
    vent.emit('menu:toggle');
    vent.emit('shadow:toggle');
  }

  render() {
    return (
      <header className="header js-header">
        <button></button>
        <svg onClick={this.toggleMenu} className="header_hamburgerIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>

        <div className="header_hero">
          <h1>{this.props.title}</h1>
        </div>
      </header>
    );
  }
}