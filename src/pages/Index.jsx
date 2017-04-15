import React from 'react';
import { Link } from 'react-router';

import { getRoutesList } from '../core/functions.js';


import List from '../components/List.jsx';

export default class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      routes: getRoutesList(),
    };
  }

  render() {
    return (
      <div>
        <List list={this.state.routes}/>
      </div>
    );
  }
}
