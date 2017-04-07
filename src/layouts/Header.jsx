import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header js-header">
        <button></button>
        <svg className="header_hamburgerIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>

        <div className="header_hero">
          <h1>{this.props.title}</h1>
        </div>
      </header>
    );
  }
}