import { useState } from 'react';
import { Header, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputValue = e => {
    const value = e.currentTarget.value;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      Notify.failure('Please enter a valid request');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

    return (
      <Header>
        <SearchForm onSubmit={handleSubmit}>
          <SearchFormButton type="submit">
            <AiOutlineSearch size="26px" />
            <SearchFormButtonLabel></SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoFocus
            autoComplete="off"
            placeholder="Search images and photos"
            name="search"
            onChange={handleInputValue}
          />
        </SearchForm>
      </Header>
    );
  };

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};