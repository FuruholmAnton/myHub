import React from 'react';
import { Link } from 'react-router';

export default class Notes extends React.Component {

  getNotes() {
    console.log('Getting notes');

    /* Fetching all the notes from the server */
    fetch('/ajax', {
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
          });
        } else {
          console.log('Oops, we haven\'t got JSON!', response);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  render() {
    return (
      <nav className="athletes-menu">
        {this.props.route.name}!
        <button className="button" onClick={this.getNotes}>Get Ajax</button>
      </nav>
    );
  }
}
