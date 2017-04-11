import React from 'react';
import { Link } from 'react-router';
import List from '../components/List.jsx';
import vent from '../core/eventEmitter.js';

export default class Notes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.getNotes = this.getNotes.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    console.log('Getting notes');
    const _this = this;

    /* Fetching all the notes from the server */
    // vent.on('notes:fetched', this.getNotes());

    this.provider = new firebase.auth.GoogleAuthProvider();

    if (firebase.auth().currentUser == undefined) {
      firebase.auth().signInWithPopup(this.provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        console.log(user);
        // vent.emit('notes:fetched');
        _this.getNotes();

        // ...
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
    } else {
      this.getNotes();
    }
  }

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

  render() {
    return (
      <nav className="athletes-menu">
        {this.props.route.name}!
        <List list={this.state.notes} />
      </nav>
    );
  }
}
