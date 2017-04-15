import React from 'react';
import { Link } from 'react-router';
import vent from 'Core/eventEmitter.js';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isToggleOn': true,
      'isChildView': false,
      'back-url': '',
      'title': props.title,
    };

    this.ui = {};

    this.id = props['data-id'] || undefined;

    if (props.slug == 'single-note') {
      this.state.sizeClass = 'is-small';
    } else {
      this.state.sizeClass = 'is-big';
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    /* Changed route */
    if (this.props.title !== nextProps.title) {
      const _this = this;
      console.log('Header, Changed route');

      let changeToSmall = false;
      let changeToBig = false;

      if (nextProps.slug == 'single-note') {
        if (this.state.sizeClass != 'is-small') {
          changeToSmall = true;
        }
      } else {
        if (this.state.sizeClass != 'is-big') {
          changeToBig = true;
        }
      }

      let tl = new TimelineMax();


      if (changeToSmall) {
        /* Scales down */
        tl.set(this.ui.header, { height: 60 });
        tl.to(this.ui.title, 0.4, { scale: 0.5, y: '0%' });
        /* Slides above */
        tl.to(this.ui.title, 0.4, { y: -60 }, '=0.2');
      } else if (changeToBig) {
        tl.set(this.ui.header, { height: 160 });
        tl.to(this.ui.title, 0.4, { scale: 1, y: '100%' });
        tl.to(this.ui.title, 0.4, { y: 100 }, '=0');
      } else {
        /* TODO: If going up the later then slide up vice versa */
        tl.fromTo(this.ui.title, 0.4, { y: '100%' }, { y: 100 });
      }

      // // tl.to(this.ui.title, 0.6, { opacity: 0 });


      // /* Change title */
      tl.call(() => {
        _this.setState({
          title: nextProps.title,
        });

        if (changeToSmall) {
          this.setState({
            sizeClass: 'is-small',
          });
        } else if (changeToBig) {
          this.setState({
            sizeClass: 'is-big',
          });
        }
      });

      if (changeToSmall) {
        /* Slides up from below */
        tl.fromTo(this.ui.title, 0.4, { y: 60 }, { y: 0 });
      } else if (changeToBig) {
        /* Slides down from above */
        tl.fromTo(this.ui.title, 0.4, { y: -100 }, { y: 0 });
      } else {
        tl.fromTo(this.ui.title, 0.4, { y: -100 }, { y: '100%' });
      }

      // tl.to(this.ui.title, 0.6, { opacity: 1 });
    }
  }

  toggleMenu(e) {
    e.preventDefault();
    console.log('Click');
    vent.emit('menu:toggle');
    vent.emit('shadow:toggle');
  }

  render() {
    return (
      <header className={`header js-header ${this.state.sizeClass}`} ref={(ref) => { this.ui.header = ref; }}>
        <Link to={'/' + this.props['back-url']} className={'header_backButton'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          {this.props['back-name'] || 'myHub'}
        </Link>

        <button onClick={this.toggleMenu} className="header_hamburgerIcon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        <div className="header_hero">
          <h1 className="header_title" ref={(ref) => { this.ui.title = ref; }}>{this.state.title}</h1>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  title: React.PropTypes.string,
};
