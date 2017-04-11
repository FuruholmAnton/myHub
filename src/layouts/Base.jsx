import React from 'react';
import Header from './Header.jsx';
import Menu from '../components/Menu.jsx';
import Shadow from '../components/Shadow.jsx';
import vent from '../core/eventEmitter.js';

/**
 *
 *
 * @export The base layout
 * @class BaseLayout
 * @extends {React.Component}
 */
export default class BaseLayout extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      'back-url': this.getBackURL(),
    };
  }*/

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

  getBackURL() {
    // console.log('getBackURL()', this.props.routes[this.props.routes.length - 1]);

    return this.props.routes[this.props.routes.length - 1].parent || '';
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps != this.props || prevState != this.state) {
  //     console.log('Base update');

  //     this.setState({
  //       backURL: this.getBackURL(),
  //     });
  //     return;
  //   }
  // }
  componentDidMount() {

  }

  /**
   *
   *
   * @returns {ReactDOM} The base layout
   *
   * @memberOf BaseLayout
   */
  render() {
    const _this = this;
    const title = this.getTitle(this.props.routes);
    const slug = this.getSlug(this.props.routes);

    let content = (
      <div className={'container page-' + slug}>
        <Header title={title}
          back-url={this.props.routes[this.props.routes.length - 1]['parent-slug'] || ''}
          back-name={this.props.routes[this.props.routes.length - 1]['parent-name'] || ''} />
        <Menu />
        <Shadow />

        <div className="content">{this.props.children}</div>

        <footer>
        </footer>
      </div>
    );

    return content;

    /* Fetching all the notes from the server */
    // vent.on('notes:fetched', this.getNotes());
  }
}

BaseLayout.propTypes = {
  routes: React.PropTypes.array,
};
