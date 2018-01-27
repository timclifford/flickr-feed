import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './nav';

export class Header extends React.Component {
  render() {
    return(
      <header>
        <Link to={'/'}><h1>Flickr Public Feed</h1></Link>
        <Nav />
      </header>
    );
  }
}
