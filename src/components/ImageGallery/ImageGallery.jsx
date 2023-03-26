import { Button } from 'components/Button/ButtonLoad';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

import { GalleryList, WrapGallary } from './ImageGallery.styled';
import { useState } from 'react';

export function ImageGallery(props) {
  const { dataImages, page, clickLoadMore, toggleLoader, toggleButton } = props;

  const [toggleModal, setToggleModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

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
      {dataImages.length && (
        <WrapGallary>
          <GalleryList>
            <ImageGalleryItem images={dataImages} modalOpen={modalOpen} />
          </GalleryList>
          {toggleButton && (
            <Button clickLoadMore={clickLoadMore} toggleLoader={toggleLoader} />
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
