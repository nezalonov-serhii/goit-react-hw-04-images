import { useState } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [dataImages, setDataImages] = useState([]);
  const [page, setPage] = useState(1);

  function onSubmitSearch(searchName) {
    setSearchName(searchName);
    setDataImages([]);
    setPage(1);
  }

  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      {searchName && (
        <ImageGallery
          searchName={searchName}
          dataImages={dataImages}
          setDataImages={setDataImages}
          page={page}
          setPage={setPage}
        />
      )}
    </>
  );
}
