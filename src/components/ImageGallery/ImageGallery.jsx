import React, { Component } from 'react';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22569115-02a432c6c1c62bbb3a59801b7';

export class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: 12,
    searchResult: null,
  };

  componentDidUpdate(prevProps, prevState) {
    let searchItem = this.props.searchItem;
    if (prevProps.searchItem !== this.props.searchItem) {
      fetch(
        `${BASE_URL}?q=${searchItem}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}}`,
      )
        .then(res => res.json())
        .then(data => {
          const { hits } = data;

          this.props.searchResult(hits);

          return this.setState({ searchResult: hits });
        });
    }
  }

  render() {
    return (
      <section>
        <ul className="ImageGallery">{this.props.children}</ul>
      </section>
    );
  }
}

ImageGallery.propTypes = {
  children: PropTypes.node,
};
