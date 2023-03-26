import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

import { Button, Form, Input, SearchbarHeader } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  function handlerChange(e) {
    setSearchValue(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault();

    console.log(searchValue);
    onSubmit(searchValue.trim());
    setSearchValue('');
  }

  return (
    <SearchbarHeader>
      <Form onSubmit={handlerSubmit}>
        <Button type="submit">
          <ImSearch />
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handlerChange}
        />
      </Form>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
