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
  constructor(props) {
    super(props);
    this.state = {
      sizeClass: 'header-is-big',
    };

    this.ui = {};

    if (this.getSlug() == 'single-note') {
      if (this.state.sizeClass != 'header-is-small') {
        this.state.sizeClass = 'header-is-small';
      }
    } else {
      if (this.state.sizeClass != 'header-is-big') {
        this.state.sizeClass = 'header-is-big';
      }
    }
  }

  /**
   *
   *
   * @param {Array} arr The applications routes
   * @returns {String} The title of the page
   *
   * @memberOf BaseLayout
   */
  getTitle(arr = this.props.routes) {
    if (typeof arr != 'object') return;
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i].name != undefined) {
        return arr[i].name;
      }
    }
    return '';
  }

  getSlug(arr = this.props.routes) {
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


  componentDidMount() {


  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routes !== nextProps.routes) {
      console.log('Base, Changed route');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.getSlug() == 'single-note') {
      if (this.state.sizeClass != 'header-is-small') {
        this.setState({
          sizeClass: 'header-is-small',
        });
        let tl = new TimelineMax();
        tl.set(this.ui.content, { paddingTop: 0, y: 160 });
        tl.to(this.ui.content, 0.4, { y: 60 });
        tl.set(this.ui.content, { paddingTop: 60, y: 0 });
      }
    } else {
      if (this.state.sizeClass != 'header-is-big') {
        this.setState({
          sizeClass: 'header-is-big',
        });
        let tl = new TimelineMax();
        tl.set(this.ui.content, { paddingTop: 0, y: 60 });
        tl.to(this.ui.content, 0.4, { y: 100 });
        tl.set(this.ui.content, { paddingTop: 160, y: 0 });
      }
    }
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
    const routes = this.props.routes;
    const currentRoute = routes[routes.length - 1];
    const id = this.props.params.id;

    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //   } else {
    //     window.location.href = '/login';
    //     return false;
    //   }
    // });


    let content = (
      <div className={`${this.state.sizeClass} container page-` + slug}>
        <Header title={title}
          back-url={currentRoute['parent-slug'] || ''}
          back-name={currentRoute['parent-name'] || ''}
          data-id={this.props.params.id}
          slug={currentRoute['slug'] || ''} />
        <Menu />
        <Shadow />

        <div className="content" ref={(ref) => { this.ui.content = ref; }}>
          <div className="content_inner">
            {this.props.children}
          </div>
        </div>

        <div className="notification">
          <div className="notification_content"></div>
        </div>

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
