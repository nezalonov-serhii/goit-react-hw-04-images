import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { GalleryList, WrapGallary } from './ImageGallery.styled';

export function ImageGallery({ dataImages }) {
  const [toggleModal, setToggleModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

  function modalOpen(curentImage) {
    setLargeImageUrl(curentImage.largeImageURL);
    setLargeImageAlt(curentImage.tags);
    setToggleModal(true);
  }

  function closeModal() {
    setToggleModal(false);
    setLargeImageUrl('');
    setLargeImageAlt('');
  }

  return (
    <>
      {dataImages.length !== 0 && (
        <WrapGallary>
          <GalleryList>
            <ImageGalleryItem images={dataImages} modalOpen={modalOpen} />
          </GalleryList>

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

ImageGallery.propTypes = {
  dataImages: PropTypes.array.isRequired,
};
