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
    // console.log(this.props);
    
    return (
      <div>
        <ul className="c-list">
          {
            this.state.routes.map((item) => {
              {/*console.log(item);*/}
              if (item.name == 'Home') return false;
              return <li className="c-list_item">list item {item.name}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}