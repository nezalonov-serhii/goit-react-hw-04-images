import { fetchImages } from 'api/fetch-api-gallery';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from './Button/ButtonLoad';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { InfoSearch } from './InfoSearch/InfoSearch';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [dataImages, setDataImages] = useState([]);
  const [page, setPage] = useState(1);

  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleButton, setToggleButton] = useState(false);

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

          setDataImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
        })
        .catch(error => {
          toast.info(error.message);
        })
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
      setToggleButton(false);
    }
  }

  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      {dataImages.length === 0 && <InfoSearch searchName={searchName} />}
      {dataImages.length !== 0 && <ImageGallery dataImages={dataImages} />}
      {toggleButton && (
        <Button clickLoadMore={clickLoadMore} toggleLoader={toggleLoader} />
      )}
      {toggleLoader && page === 1 && (
        <Loader widthLoader={'200'} heightLoader={'200'} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
      />
    </>
  );
}
