import React from 'react';
import { Link } from 'react-router';
import routes from '../routes';

import List from '../components/List.jsx';

export default class Index extends React.Component {

  constructor(props) {
    super(props);
    
    let rs = routes.props.children.filter(item => {
      if (!item) return false;
      return item.props.show;
    });
    rs = rs.map(item => item.props);
    console.log(rs);
    this.state = {
      routes: rs
    }
  }

  render() {
    return (
      <div>
        <List list={this.state.routes}/>
      </div>
    );
  }
}