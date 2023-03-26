import { fetchImages } from 'api/fetch-api-gallery';
import { useEffect, useState } from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [dataImages, setDataImages] = useState([]);
  const [page, setPage] = useState(1);

  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);

  useEffect(() => {
    if (!searchName) return;
    setToggleLoader(true);

    function getGallary() {
      fetchImages(searchName, page)
        .then(images => {
          if (Math.ceil(images.total / 12) <= page) {
            setToggleButton(false);
          } else {
            setToggleButton(true);
          }

          console.log('123');

          setDataImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          setToggleLoader(false);
        });
    }

    getGallary();
  }, [page, searchName, setDataImages]);

  function clickLoadMore() {
    setPage(prevPage => {
      return prevPage + 1;
    });
  }

  function onSubmitSearch(searchName) {
    if (searchName !== '') {
      setSearchName(searchName);
      setDataImages([]);
      setPage(1);
    }
  }

  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      {searchName && (
        <ImageGallery
          clickLoadMore={clickLoadMore}
          dataImages={dataImages}
          page={page}
          toggleLoader={toggleLoader}
          toggleButton={toggleButton}
        />
      )}
    </>
  );
}
