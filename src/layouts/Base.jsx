import React from 'react';
import Header from './Header.jsx';

export default class BaseLayout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header/>

        <div className="app-content">{this.props.children}</div>
        
        <footer>
        </footer>
      </div>
    );
  }
}