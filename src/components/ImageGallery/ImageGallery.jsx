import { useEffect, useState } from 'react';

import { fetchImages } from 'api/fetch-api-gallery';
import { Button } from 'components/Button/ButtonLoad';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import { GalleryList, WrapGallary } from './ImageGallery.styled';

export function ImageGallery(props) {
  const { searchName, dataImages, page, setDataImages, setPage } = props;

  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

  useEffect(() => {
    function getGallary() {
      fetchImages(searchName, page)
        .then(images => {
          if (images.hits.length === 0) return;
          if (Math.ceil(images.total / 12) <= page) {
            setToggleButton(false);
          } else {
            setToggleButton(true);
          }

          setDataImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
        })
        .catch(error => console.log(error))
        .finally(() => {
          setToggleLoader(false);
        });
    }

    if (searchName) {
      getGallary();
    }
  }, [page, searchName, setDataImages]);

  function clickLoadMore() {
    setPage(prevPage => {
      return prevPage + 1;
    });
  }

  function modalOpen(curentImage) {
    setLargeImageUrl(curentImage.largeImageURL);
    setLargeImageAlt(curentImage.tags);
    setToggleModal(true);
  }

  function closeModal() {
    setLargeImageUrl('');
    setLargeImageAlt('');
    setToggleModal(false);
  }

  return (
    <>
      {toggleLoader && page === 1 && (
        <Loader widthLoader={'200'} heightLoader={'200'} />
      )}
      {dataImages[0] && (
        <WrapGallary>
          {searchName && (
            <>
              <GalleryList>
                <ImageGalleryItem images={dataImages} modalOpen={modalOpen} />
              </GalleryList>
              {toggleButton && (
                <Button
                  clickLoadMore={clickLoadMore}
                  toggleLoader={toggleLoader}
                />
              )}
            </>
          )}
          {toggleModal && (
            <Modal
              url={largeImageUrl}
              alt={largeImageAlt}
              closeModal={closeModal}
            />
          )}
        </WrapGallary>
      )}
    </>
  );
}
