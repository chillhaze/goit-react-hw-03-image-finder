import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22569115-02a432c6c1c62bbb3a59801b7';
const PER_PAGE = 12;

export class ImageGallery extends Component {
  state = {
    page: 1,
    per_page: PER_PAGE,

    searchResult: [],
    searchItem: '',

    error: null,

    largeImg: '',
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const searchItem = this.props.searchItem;
    const { page, per_page } = this.state;

    if (prevProps.searchItem !== searchItem) {
      // this.setState({this.state.searchItem = ''});
      this.setState({ status: 'pending' });

      fetch(
        `${BASE_URL}?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}}`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`${searchItem} returned with error`));
        })
        .then(data => {
          const { hits } = data;

          hits.length === 0
            ? this.setState({ searchResult: [], status: 'idle' })
            : this.setState({ searchResult: hits });

          return this.setState({ status: 'resolved' });
        })
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
  }

  handleLoadMoreBtnClick = () => {
    this.setState(prevState => ({
      per_page: prevState.per_page + PER_PAGE,
      page: prevState.page + 1,
    }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { searchResult, error, status } = this.state;

    if (status === 'idle') {
      return <h2>hello</h2>;
    }

    if (status === 'pending') {
      return (
        <div className="loader_wrapper">
          <Loader
            type="TailSpin"
            color="#3f51b5"
            height={60}
            width={60}
            className="Loader"
          />
        </div>
      );
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <section>
          <ul className="ImageGallery">
            {searchResult.map(item => {
              return (
                <ImageGalleryItem
                  key={item.id}
                  id={item.id}
                  src={item.webformatURL}
                  tag={item.tag}
                  currentImage={this.props.currentImage}
                />
              );
            })}
          </ul>
          {searchResult.length > PER_PAGE && (
            <Button onClick={this.handleLoadMoreBtnClick} />
          )}
        </section>
      );
    }
  }
}

ImageGallery.propTypes = {
  children: PropTypes.node,
};
