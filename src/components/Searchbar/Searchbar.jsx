import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { GrSearch } from 'react-icons/gr';

import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class SearchBar extends Component {
  state = {
    value: '',
  };


  handleChange = e => {
    this.setState({ value: e.target.value.toLowerCase() });
  };


  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.value.trim() === '') {
      alert('Введите данные для поиска');
      return;
    }

    this.props.onSubmit({ ...this.state });
  };

  render() {
    const { value } = this.state;
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <GrSearch />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
