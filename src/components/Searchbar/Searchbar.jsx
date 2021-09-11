import React, { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchItem: '',
  };

  handleFormChange = e => {
    this.setState({ searchItem: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchItem.trim() === '') {
      console.log('enter image name');
      return;
    }

    this.props.onSubmit(this.state.searchItem);
    this.setState({ searchItem: '' });
  };

  render() {
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
            onChange={this.handleFormChange}
            className="SearchForm-input"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
