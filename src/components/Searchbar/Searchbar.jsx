import PropTypes from 'prop-types';
import React, { Component } from 'react';
import toast from 'react-hot-toast';

export class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  // Считываю результат поиска
  handleFormChange = e => {
    this.setState({ searchItem: '' });
    this.setState({ searchItem: e.currentTarget.value.toLowerCase() });
  };

  // Передаю результат поиска
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchItem.trim() === '') {
      toast.error('empty field');
      return;
    }
    this.props.onSubmit(this.state.searchItem);
    this.setState({ searchItem: '' });
  };

  render() {
    const { searchItem } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className="SearchForm-button"
            onClick={this.handleSubmit}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={searchItem}
            onChange={this.handleFormChange}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
