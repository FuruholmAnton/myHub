import React from 'react';
import { Link } from 'react-router';
import routes from '../routes';

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
        <ul className="c-list">
          {
            this.state.routes.map((item) => {
              return <li className="c-list_item" key={item.name}>list item {item.name}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}