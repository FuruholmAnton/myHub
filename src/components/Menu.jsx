
import React from 'react';
import { Link } from 'react-router';

export default class Menu extends React.Component {
  render() {
    return (
      <nav className="menu">
        {this.props.menuItems.map(menuItem => {
          return <Link key={menuItem.id} to={`/athlete/${menuItem.id}`} activeClassName="active">
            {menuItem.name}
          </Link>;
        })}
      </nav>
    );
  }
}