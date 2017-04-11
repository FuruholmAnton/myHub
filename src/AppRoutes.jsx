import React from 'react';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

export default class AppRoutes extends React.Component {

  // constructor() {

  // }

  // componentDidMount() {
  //   console.log('Getting notes');
  //   const _this = this;

  //   /* Fetching all the notes from the server */
  //   // vent.on('notes:fetched', this.getNotes());

  //   this.provider = new firebase.auth.GoogleAuthProvider();

  //   if (firebase.auth().currentUser == undefined) {
  //     firebase.auth().signInWithPopup(this.provider).then(function(result) {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       let token = result.credential.accessToken;
  //       // The signed-in user info.
  //       let user = result.user;
  //       console.log(user);
  //       // vent.emit('notes:fetched');

  //       // ...
  //     }).catch(function(error) {
  //       // Handle Errors here.
  //       let errorCode = error.code;
  //       let errorMessage = error.message;
  //       // The email of the user's account used.
  //       let email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       let credential = error.credential;
  //       // ...
  //     });
  //   } else {

  //   }
  // }

  render() {
    return (
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    );
  }
}
