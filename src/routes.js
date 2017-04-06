import React from 'react'
import { Route, IndexRoute } from 'react-router'
import BaseLayout from './layouts/Base.jsx';
import IndexPage from './pages/Index.jsx';
import NotesPage from './pages/Notes.jsx';
import NotFoundPage from './pages/NotFound.jsx';

const routes = (
  <Route path="/" component={BaseLayout}>
    <IndexRoute component={IndexPage}/>
    <Route path="notes" component={NotesPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;