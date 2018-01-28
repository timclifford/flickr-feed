import React from 'react';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import dateFormat from 'dateformat';

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: {
        items: []
      },
      hasTagResults: false
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
          const feed = data;
          console.log(this);
          this.setState({ feed });
        });

      })
      .catch(err => {
        console.log('Fetch Error', err);
      })
  }

  componentDidMount() {
    this.getData();
    this.getTagResults();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.feed !== this.state.feed) {
      this.getData();
    }
  }

  getTagResults() {
    const hasTagResults = this.props.tagResults;
    let results = null;

    if (hasTagResults && this.props.tagResults.items) {
      results = this.props.tagResults;
    } else if (this.state.feed.items) {
      results = this.state.feed;
    }

    return results;
  }

  checkIfTagResults() {
    let isTagResults = null;
    if (this.props.tagResults) {
      isTagResults = this.props.tagResults.items ? true : false;
    }
    return isTagResults;
  }

  render() {
    return(
      <div className="feed__wrapper">
        <h2>{this.props.tagResults ? this.props.tagResults.title : this.state.feed.title}</h2>

        {this.getTagResults().items.map((element, index) => {
          let link = null;

          if (this.checkIfTagResults()) {
            link = `/tag/${index}/${element.author_id}`;
          } else {
            link = `/photo/${index}/${element.author_id}`;
          }

          return(
            <article key={index} className="feed__item">
              <div className="photo__thumbnail">
                <a href={link} className="photo__link">
                  <img src={element.media.m}/>
                </a>
              </div>
              <div className="photo__meta">
                <Link key={index} to={link} className="photo__link">
                  <h2 className="photo__title">
                    <Truncate lines={1} ellipsis={<span>...</span>}>
                      {element.title}
                    </Truncate>
                  </h2>
                </Link>
                <div className="photo__author">
                  <strong>Posted by:</strong> <a href={'https://www.flickr.com/photos/' + element.author_id}>{element.author.slice(20, -2)}</a>
                </div>
                <div className="photo__published"><strong>Published:</strong> {dateFormat(element.published, "dS mmmm yyyy h:MM")}</div>
                <div className="photo__view-more"><a href={element.link}>View on Flickr</a></div>
              </div>
            </article>
          )
        })}
      </div>
    );
  }
}
