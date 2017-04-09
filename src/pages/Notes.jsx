import React from 'react';
import { Link } from 'react-router';
import List from '../components/List.jsx';

export default class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    console.log('Getting notes');
    /* Fetching all the notes from the server */
    fetch('/ajax',
      {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          function: 'getData',
          data: 'notes',
        }),
      })
      .then((response) => {
        let contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json().then((json) => {
            console.log('Data', json);

            let arr = [];
            for (let [key, value] of Object.entries(json.data)) {
              value.key = key;
              value.path = '/notes/' + key;
              arr.push(value);
            }
            // console.log(arr);

            this.setState({
              notes: arr,
            });
            return (json);
          });
        } else {
          console.log('Oops, we haven\'t got JSON!', response);
          return false;
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        return false;
      });
  }

  render() {
    return (
      <nav className="athletes-menu">
        {this.props.route.name}!
        <List list={this.state.notes} />
      </nav>
    );
  }
}
