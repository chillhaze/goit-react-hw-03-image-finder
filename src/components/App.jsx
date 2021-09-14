import React, { Component } from 'react';
import { fetchItems } from '../api-services/fetch-api';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// Уведомления Тостер
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    status: 'idle',
    page: 1,
    searchItem: '',
    searchResult: [],
    error: null,

    selectedImage: null,
    selectedImageTag: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchItem, page } = this.state;
    // Фетч по поиску
    if (prevState.searchItem !== searchItem) {
      this.setState({ status: 'pending', page: 1 });

      try {
        const response = await fetchItems(searchItem, page);
        const { hits } = response.data;

        if (hits.length === 0) {
          toast.error('no images');
          this.setState({ searchResult: [], status: 'idle' });
        } else if (hits.length > 0) {
          toast.success('images found');
          this.setState({ searchResult: hits });
        }

        return this.setState({ status: 'resolved' });
      } catch (error) {
        toast.error('something went wrong');
        return this.setState({ error: error, status: 'rejected' });
      }
    }

    // Фетч по нажатию Load more
    if (prevState.page !== page && page > 1) {
      this.setState({ status: 'pending' });

      try {
        const response = await fetchItems(searchItem, page);
        const { hits } = response.data;

        if (hits.length === 0) {
          toast.error('no more images found');
          this.setState({
            searchResult: [],
            status: 'idle',
            page: 1,
          });

          return;
        }
        toast.success('more images found');
        this.setState(prevState => ({
          searchResult: [...prevState.searchResult, ...hits],
        }));
        this.setState({ status: 'resolved' });
        this.scrollDown();

        return;
      } catch (error) {
        return error => this.setState({ error: error, status: 'rejected' });
      }
    }
  }
  // Передаю в стейт текст поиска
  handleFormSubmit = searchQuery =>
    this.setState({ searchItem: searchQuery, page: 1 });

  // Передаю в стейт результат поиска
  handleSearchResult = querryResult => {
    if (querryResult.length === 0) {
      this.setState({ searchResult: null });
    } else {
      this.setState({ searchResult: querryResult });
    }
  };

  // Передаю в стейт информацию для модального окна
  handleSelectItem = item =>
    this.setState({
      selectedImage: item.largeImageURL,
      selectedImageTag: item.tags,
    });

  // Метод закрытия модального окна
  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  // Загружаю больше изображений
  handleBtnClick = () => {
    if (this.state.searchResult.length !== 0) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
    return;
  };

  // Функция скролла
  scrollDown = () => {
    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, searchResult, error, selectedImage, selectedImageTag } =
      this.state;
    const showBtn = searchResult.length > 0 && status !== 'idle';

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Toaster position="top-right" />

        {status === 'pending' && (
          <div className="loader_wrapper">
            <Loader
              type="TailSpin"
              color="#3f51b5"
              height={60}
              width={60}
              className="Loader"
            />
          </div>
        )}

        {status === 'rejected' && <h2 className="error">{error.message}</h2>}

        {status === 'resolved' && (
          <div>
            <ImageGallery
              searchResult={searchResult}
              onSelect={this.handleSelectItem}
            />
            {showBtn && <Button onBtnClick={this.handleBtnClick} />}

            {selectedImage && (
              <Modal
                src={selectedImage}
                tag={selectedImageTag}
                onClose={this.handleModalClose}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

// Через обычный фетч без axios+async/await

// componentDidUpdate(prevProps, prevState) {
//     const { searchItem, page } = this.state;
//     // Фетч по поиску
//     if (prevState.searchItem !== searchItem) {
//       this.setState({ status: 'pending', page: 1 });

//       fetchItems(searchItem, page)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           toast.error('something went wrong');
//           return Promise.reject(
//             new Error(`search '${searchItem}' returned with error`),
//           );
//         })
//         .then(data => {
//           const { hits } = data;

//           if (hits.length === 0) {
//             toast.error('no images');
//             this.setState({ searchResult: [], status: 'idle' });
//           } else if (hits.length > 0) {
//             toast.success('images found');
//             this.setState({ searchResult: hits });
//           }

//           return this.setState({ status: 'resolved' });
//         })
//         .catch(error => this.setState({ error: error, status: 'rejected' }));
//     }
//     // Фетч по нажатию Load more
//     if (prevState.page !== page && page > 1) {
//       this.setState({ status: 'pending' });

//       fetchItems(searchItem, page)
//         .then(response => {
//           if (response.ok) {
//             return response.json();
//           }
//           toast.error('something went wrong');
//           return Promise.reject(
//             new Error(`search '${searchItem}' returned with error`),
//           );
//         })
//         .then(data => {
//           const { hits } = data;

//           if (hits.length === 0) {
//             toast.error('no more images found');
//             this.setState({
//               searchResult: [],
//               status: 'idle',
//               page: 1,
//             });

//             return;
//           }
//           toast.success('more images found');
//           this.setState(prevState => ({
//             searchResult: [...prevState.searchResult, ...hits],
//           }));
//           this.setState({ status: 'resolved' });
//           this.scrollDown();

//           return;
//         })
//         .catch(error => this.setState({ error: error, status: 'rejected' }));
//     }
//   }
