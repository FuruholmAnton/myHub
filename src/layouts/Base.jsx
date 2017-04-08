import React from 'react';
import Header from './Header.jsx';
import Menu from '../components/Menu.jsx';
import Shadow from '../components/Shadow.jsx';

/**
 *
 *
 * @export The base layout
 * @class BaseLayout
 * @extends {React.Component}
 */
export default class BaseLayout extends React.Component {

  /**
   *
   *
   * @param {Array} arr The applications routes
   * @returns {String} The title of the page
   *
   * @memberOf BaseLayout
   */
  getTitle(arr) {
    if (typeof arr != 'object') return;
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i].name != undefined) {
        return arr[i].name;
      }
    }
    return '';
  }

  getSlug(arr) {
    if (typeof arr != 'object') return;
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i].slug != undefined) {
        return arr[i].slug;
      }
    }
    return '';
  }

  /**
   *
   *
   * @returns {ReactDOM} The base layout
   *
   * @memberOf BaseLayout
   */
  render() {
    const title = this.getTitle(this.props.routes);
    const slug = this.getSlug(this.props.routes);
    return (
      <div className={'container page-' + slug}>
        <Header title={title} />
        <Menu />
        <Shadow />

        <div className="content">{this.props.children}</div>

        <footer>
        </footer>
      </div>
    );
  }
}
