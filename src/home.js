import React from 'react';
import { Header } from './header/header';
import { Feed } from './feed/feed';


//import { Form } from './form/form';
//import { TopRecipes } from './topRecipes/topRecipes';




export class Home extends React.Component {
  render() {
    return(
      <div className="container">
        <Header />
        <Feed />
      </div>
    );
  }
}
