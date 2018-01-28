import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from './nav';
import logo from './logo.svg';

export class Header extends React.Component {
  render() {
    return(
      <header>
        <img src={logo} className="logo" />
        <Link to={'/'}><h1>Flickr Public Feed</h1></Link>
        <Nav />
      </header>
    );
  }
}
