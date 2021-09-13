import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { fetchItems } from '../../api-services/fetch-api';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export class ImageGallery extends Component {
  state = {
    searchResult: [],

    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchItem, page } = this.props;

    if (prevProps.searchItem !== searchItem) {
      this.setState({ status: 'pending' });

      fetchItems(searchItem, page)
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

    if (prevProps.page !== page) {
      this.setState({ status: 'pending' });

      fetchItems(searchItem, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`${searchItem} returned with error`));
        })
        .then(data => {
          const { hits } = data;
          console.log(hits);

          if (hits.length === 0) {
            this.setState({ searchResult: [], status: 'idle' });
            return;
          }

          this.setState(prevState => ({
            searchResult: [...prevState.searchResult, ...hits],
          }));

          return this.setState({ status: 'resolved' });
        })
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
    this.scrollDown();
  }

  scrollDown = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { searchResult, error, status } = this.state;

    if (status === 'idle') {
      return <h2> </h2>;
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
            {searchResult.map((item, index) => {
              const itemId = uuidv4();
              return (
                <ImageGalleryItem
                  key={itemId}
                  id={item.id}
                  src={item.webformatURL}
                  tag={item.tag}
                  currentImage={this.props.currentImage}
                />
              );
            })}
          </ul>
          {searchResult.length >= 0 && status !== 'idle' && (
            <Button onBtnClick={this.props.onBtnClick} />
          )}
        </section>
      );
    }
  }
}

ImageGallery.propTypes = {
  children: PropTypes.node,
};
