import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BaseLayout from './layouts/Base.jsx';
import IndexPage from './pages/Index.jsx';
import NotesPage from './pages/Notes.jsx';
import SingleNotePage from './pages/SingleNote.jsx';
import NotFoundPage from './pages/NotFound.jsx';

const routes = (
  <Route path="/" name="myHub" slug="myhub" component={BaseLayout}>
    <IndexRoute component={IndexPage} />
    <Route path="notes" name="Notes" slug="notes" component={NotesPage} show />
    <Route path="notes/:id" name="Single note" slug="single-note" component={SingleNotePage} />
    <Route path="test" name="Test" slug="test" show />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;
