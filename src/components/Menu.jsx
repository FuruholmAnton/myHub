
import React from 'react';
import { Link } from 'react-router';
import vent from '../core/eventEmitter.js';
import List from './List.jsx';

import { getRoutesList } from '../core/functions.js';

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMenuOpen: undefined };

    // This binding is necessary to make `this` work in the callback
    this.toggleMenu = this.toggleMenu.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu() {
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
    document.body.classList.toggle('menu-is-open');
  }

  closeMenu() {
    document.body.classList.remove('menu-is-open');
    this.setState({
      isMenuOpen: false,
    });
    vent.emit('shadow:hide');
  }

  openMenu() {
    document.body.classList.add('menu-is-open');
    this.setState({
      isMenuOpen: true,
    });
  }

  componentDidMount() {
    vent.on('menu:toggle', this.toggleMenu);
    vent.on('menu:open', this.openMenu);
    vent.on('menu:close', this.closeMenu);
  }

  render() {
    return (
      <nav className={(this.state.isMenuOpen ? 'is-open' : (this.state.isMenuOpen != null ? 'is-closed' : '')) + ' menu'}>
        <Link to="/" onClick={() => {
          vent.emit('menu:close');
        }}>
          <h2 className="menu_heading"><span className="menu_heading--first">my</span>Hub</h2>
        </Link>

        <List list={getRoutesList()} closeMenuOnClick />
      </nav>
    );
  }
}
