import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes.jsx';

import 'wicg-focus-ring';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
