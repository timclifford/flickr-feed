import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './home';
import { Photo } from './components/photo/photo';
import { Tag } from './components/tags/tag';

import './index.css';

class App extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route path={'/tag/:id/:index'} component={ Tag } />
          <Route path={'/photo/:id'} component={ Photo } />
          <Route path={'/'} component={ Home } />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
