import React from 'react';
import Header from './Header.jsx';
import Menu from '../components/Menu.jsx';
import Shadow from '../components/Shadow.jsx';

export default class BaseLayout extends React.Component {

  getTitle(arr) {
    if (typeof arr != 'object') return;
    for (let i = arr.length-1; i >= 0; i -= 1) {
      if (arr[i].name != undefined) {
        return arr[i].name;
      }
    }
    return '';
  }

  render() {
    // console.log(this.props);
    
    const title = this.getTitle(this.props.routes);
    return (
      <div className={"container page-" + title}>
        <Header title={title} />
        <Menu/>
        <Shadow/>

        <div className="content">{this.props.children}</div>
        
        <footer>
        </footer>
      </div>
    );
  }
}