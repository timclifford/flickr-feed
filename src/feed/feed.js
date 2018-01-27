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
      }
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
          this.setState({ feed });
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
    if(nextProps.feed !== this.state.feed) {
      this.getData();
    }
  }

  render() {
    return(
      <div className="feed__wrapper">
        {this.state.feed.items.map((element, index) => {
          return(
            <article key={index} className="feed__item">
              <div className="photo__thumbnail">
                <a href={`/photo/${index}/${this.state.feed.items[index].author_id}`} className="photo__link">
                  <img src={element.media.m}/>
                </a>
              </div>
              <div className="photo__meta">
                <Link key={index} to={`/photo/${index}/${this.state.feed.items[index].author_id}`} className="photo__link">
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
