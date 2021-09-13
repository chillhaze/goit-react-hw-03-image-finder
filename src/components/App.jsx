import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

import { Modal } from './Modal';

export class App extends Component {
  state = {
    searchItem: '',
    page: 1,
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

  onBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchItem, page, currentImage, modalOpen } = this.state;
    // console.log(this.state.searchItem);
    // console.log(this.state.searchResult);

    // const notify = () => toast('Here is your toast.');

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchItem={searchItem}
          page={page}
          searchResult={this.handleSearchResult}
          currentImage={this.handleItemClick}
          onBtnClick={this.onBtnClick}
        />

        {modalOpen && (
          <Modal src={currentImage} onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}
