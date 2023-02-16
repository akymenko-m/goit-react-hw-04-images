import { useState } from 'react';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit, isDisabled }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="Submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          disabled={isDisabled}
          onChange={handleChange}
          name="query"
          value={query}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
