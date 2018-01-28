import React from 'react';
import { Header } from './components/header/header';
import { Feed } from './components/feed/feed';
import { SearchForm } from './components/searchForm/searchForm';

export class Home extends React.Component {
  render() {
    return(
      <div className="home">
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="searchFormWrapper">
          <SearchForm />
        </div>
        <div className="container">
          <Feed />
        </div>
      </div>
    );
  }
}
