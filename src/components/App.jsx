import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    searchItem: '',
    searchResult: null,

    // loading: false,
  };

  handleFormSubmit = searchQuery => {
    // e.preventDefault();

    this.setState({ searchItem: searchQuery });
  };

  handleSearchResult = querryResult => {
    this.setState({ searchResult: querryResult });
  };

  render() {
    console.log(this.state.searchItem);
    console.log(this.state.searchResult);

    // const notify = () => toast('Here is your toast.');

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchItem={this.state.searchItem}
          searchResult={this.handleSearchResult}
        >
          {this.state.searchItem &&
            this.state.searchResult &&
            this.state.searchResult.map(item => (
              <ImageGalleryItem
                id={item.id}
                src={item.webformatURL}
                tag={item.tag}
                key={item.id}
              />
            ))}
        </ImageGallery>
      </div>
    );
  }
}
