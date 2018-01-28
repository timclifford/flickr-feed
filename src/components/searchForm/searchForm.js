import React from 'react';
import { SearchFormResults } from './searchFormResults';
import search from './search.svg';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      val: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp() {
    let val = document.getElementById('searchInput').value;

    if (val === '') {
      document.getElementById('results').className = 'noDisplay';
    }

    this.setState({ val });
  }

  handleSubmit(e) {
    e.preventDefault();

    document.getElementById('results').className = 'formResults';
    let val = document.getElementById('searchInput').value;

    if (val === '') {
      document.getElementById('results').className = 'noDisplay';
    }

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const tagUrl = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${val}&tagmode=all&format=json&nojsoncallback=true`;

    fetch(proxyurl + tagUrl, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true"
      }
    })
    .then(response => {
      if (response.status !== 200) {
        console.log('Error: ' + response.status);
        return;
      }

      response.json().then(data => {
        const results = data.items;
        this.setState({ results });
      });
    })

    .catch(err => {
      console.log('Fetch Error', err);
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} id="form">
        <img src={search} alt="search icon" className="searchIcon" />
        <input onKeyUp={this.handleKeyUp} id="searchInput" ref="searchInput" className="searchBar" type="text" placeholder="Search a tag..." required />
        <button onClick={this.handleSubmit} className="button button--search">Search</button>
        <SearchFormResults results={this.state.results} val={this.state.val} />
      </form>
    );
  }
}
