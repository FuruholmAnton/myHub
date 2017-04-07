import React from 'react';
import { Link } from 'react-router';
import { Router } from 'react-router';

export default class Header extends React.Component {
  render() {
    // console.log(Router.routes);
    return (
      <header className="header js-header">
        header
        <svg className="header_hamburgerIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>

        <div className="header_hero">
          <h1>{  }</h1>
        </div>
      </header>
    );
  }
}