import React from 'react';
import { Link } from 'react-router-dom';

export class SearchFormResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    document.getElementById('results').className = 'noDisplay';
    document.getElementById('searchInput').value = '';
  }

  render() {
    return(
      <ul id="results" onClick={this.handleClick}>
        {this.props.results.map((element, index) => {
          // Map tags ready for rendering.
          const renderTagList = () => {
            let encodeTagList = encodeURIComponent(this.props.val);
            return encodeTagList;
          };
          return(
            <li key={index} onClick={this.handleClick}>
              <Link key={index} to={`/tag/${index}/${renderTagList()}`} >
                <img src={`${this.props.results[index].media.m}`} alt={`${this.props.results[index].title}`} className="searchResult" />
                <div>
                  <p>{this.props.results[index].title}</p>
                  <p><strong>Posted by: </strong>{element.author.slice(20, -2)}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    );
  }
}
