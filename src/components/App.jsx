import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

import { Modal } from './Modal';

export class App extends Component {
  state = {
    searchItem: '',
    currentImage: '',
    modalOpen: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchItem: searchQuery });
  };

  handleSearchResult = querryResult => {
    if (querryResult.length === 0) {
      this.setState({ searchResult: null });
    } else {
      this.setState({ searchResult: querryResult });
    }
  };

  handleItemClick = e => {
    this.setState({ currentImage: e.currentTarget.src });
    this.setState({ modalOpen: true });
  };

  handleModalClose = e => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { searchItem, currentImage, modalOpen } = this.state;
    // console.log(this.state.searchItem);
    // console.log(this.state.searchResult);

    // const notify = () => toast('Here is your toast.');

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          perPage={this.props.per_page}
          searchItem={searchItem}
          searchResult={this.handleSearchResult}
          currentImage={this.handleItemClick}
        />

        {modalOpen && (
          <Modal src={currentImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}
