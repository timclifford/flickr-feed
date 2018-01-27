import React from 'react';
import { Header } from '../header/header';
import './photo.css';
import Truncate from 'react-truncate';
import dateFormat from 'dateformat';

export class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: [],
      src: []
    }
    this.getData = this.getData.bind(this);
  }

  getData() {
    const flickrUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json&nojsoncallback=true';

    fetch(flickrUrl, {
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
          const photo = data.items[id];
          const src = data.items[id].media.m;
          console.log(photo);
          this.setState({ photo });
          this.setState({ src });
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

  render() {
    return(
      <div className="container">
        <div className="photo__header">
          <a href={this.state.photo.link} className="photo__link">
            <h2 className="photo__title">
              <Truncate lines={1} ellipsis={<span>...</span>}>
                {this.state.photo.title}
              </Truncate>
            </h2>
          </a>
          <div className="go-back"><a href="/" className="button button--back">Back</a></div>
        </div>
        <div className="photo__publisher">
          <span className="photo__author">
            Posted by: <a href={'https://www.flickr.com/photos/' + this.state.photo.author_id}>{this.state.photo.author}</a>
          </span>
          <span className="photo__published">Published: {dateFormat(this.state.photo.published, "dS mmmm yyyy h:MM")}</span>
        </div>

        <div className="photo__content">
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
          </div>
        </div>
      </div>
    );
  }
}
