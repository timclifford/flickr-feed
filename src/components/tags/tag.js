import React from 'react';
import Truncate from 'react-truncate';
import dateFormat from 'dateformat';
import Highlighter from 'react-highlight-words';
import { Header } from '../header/header';
import { Feed } from '../feed/feed';

export class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: [],
      results: [],
      src: [],
      tag: {
        searchText: [],
        textToHighlight: []
      },
      searchInput: []
    }
    this.didSwitchParentObject = true;
    this.getData = this.getData.bind(this);
  }

  getData() {
    const tags = encodeURIComponent(this.props.match.params.index);
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const flickrUrl = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${tags}&tagmode=all&format=json&nojsoncallback=true`;

    fetch(proxyurl + flickrUrl, {
        headers : {
          "Content-Type": "application/json",
          "Accept": "application/json",
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
          const id = this.props.match.params.id;
          const results = data;
          const photo = data.items[id];
          const src = data.items[id].media.m;
          const tag = {
            searchText: this.props.match.params.index.split(/\s/).filter(word => word),
            textToHighlight: photo.tags
          }
          this.setState({ results });
          this.setState({ photo });
          this.setState({ src });
          this.setState({ tag });
        });

      })
      .catch(err => {
        console.log('Fetch Error', err);
      })
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.photo !== this.state.photo) {
      this.getData();
    }
  }

  renderResults() {
    return(
      <Feed tagResults={this.state.results} tagIndex={this.props.match.params.index}/>
    )
  }

  render() {
    const author = this.state.photo.author ? this.state.photo.author.slice(20, -2) : this.state.photo.author;

    return(
      <div className="photoWrapper">
        <div className="headerWrapper">
          <Header />
        </div>
        <div className="container">
          <div className="tag__header">
            <h2>Result for tag search <span>{this.props.match.params.index}...</span></h2>
            <div className="go-back"><a href="/" className="button button--back">Back</a></div>
          </div>
          <div className="photo__header">
            <a href={this.state.photo.link} className="photo__link">
              <h2 className="photo__title">
                <Truncate lines={1} ellipsis={<span>...</span>}>
                  {this.state.photo.title}
                </Truncate>
              </h2>
            </a>
          </div>
          <div className="photo__publisher">
            <span className="photo__author">
              Posted by: <a href={'https://www.flickr.com/photos/' + this.state.photo.author_id}>{author}</a>
            </span>
            <span className="photo__published">Published: {dateFormat(this.state.photo.published, "dS mmmm yyyy h:MM")}</span>
          </div>

          <div className="tag__content">
            <div className="photo__thumbnail">
              <a href={this.state.photo.link} className="photo__link">
                <img src={this.state.src}/>
              </a>
            </div>
            <div className="photo__meta">
              <p><strong>Title:</strong> {this.state.photo.title}</p>
              <p><strong>Date taken:</strong> {this.state.photo.date_taken}</p>
              <p><strong>Source:</strong> {this.state.photo.link}</p>
              <p><strong>Tags:</strong> {this.state.photo.tags}</p>
              <p><strong>Highlighted tags:</strong></p>
              <Highlighter
                highlightClassName={'highlight'}
                searchWords={this.state.tag.searchText}
                textToHighlight={this.state.tag.textToHighlight ? this.state.tag.textToHighlight.toString() : '' }
                autoEscape={true}
                caseSensitive={false}
                highlightStyle={{ fontWeight: 'bold' }}
               />
            </div>
          </div>
          <div className="tag__results">
            {this.renderResults()}
          </div>
        </div>
      </div>
    );
  }
}
