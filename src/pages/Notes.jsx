import React from 'react';
import { Link } from 'react-router';

import vent from 'Core/eventEmitter';
import globals from 'Core/globals';

import List from 'Components/List';
import CreateButton from 'Components/CreateButton';


export default class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.getNotes = this.getNotes.bind(this);
  }

  componentDidMount() {
    console.log('Getting notes');
    const _this = this;

    // check indexedDB

    _this.getNotes();
  }

  /* Fetching all the notes from the server */
  getNotes() {
    const _this = this;
    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
      let notes = snapshot.val().notes;
      console.log(notes);

      for (let [key, value] of Object.entries(notes)) {
        firebase.database().ref('/notes/' + key).once('value').then(function(note) {
          console.log('Note', note.val());
          let n = note.val();
          n.key = key;
          n.path = '/notes/' + key;

          let oldNotes = _this.state.notes;
          oldNotes.push(n);
          globals.notes.push(n);
          console.log(oldNotes);

          _this.setState({
            notes: oldNotes,
          });
        });
      }
      // ...
    }).catch(function(error) {
      console.log(error);
    });
  }

  createNote() {
    let newPostKey = firebase.database().ref().child('notes').push().key;
  }

  render() {
    return (
      <nav className="athletes-menu">
        {this.props.route.name}!
        <List list={this.state.notes} />

        <CreateButton options={[1, 2]} />
      </nav>
    );
  }
}
