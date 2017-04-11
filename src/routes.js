import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BaseLayout from './layouts/Base.jsx';
import IndexPage from './pages/Index.jsx';
import NotesPage from './pages/Notes.jsx';
import SingleNotePage from './pages/SingleNote.jsx';
import NotFoundPage from './pages/NotFound.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';

import { onRouteChange } from './core/functions';

const routes = (
  <Route path="/" name="myHub" slug="myhub" onChange={onRouteChange} component={BaseLayout}>
    <IndexRoute component={IndexPage} />
    <Route path="notes" name="Notes" slug="notes" component={NotesPage} show />
    <Route path="notes/:id" parent-slug="notes" parent-name="Notes" name="Single note" slug="single-note" component={SingleNotePage} />
    <Route path="test" name="Test" slug="test" show />
    <Route path="login" name="Login" slug="login" component={LoginPage} />
    <Route path="register" name="Register" slug="register" component={RegisterPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
