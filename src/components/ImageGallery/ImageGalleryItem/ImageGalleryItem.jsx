import PropTypes from 'prop-types';

import { GalleryItem, Image } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ images, modalOpen }) {
  const hendelModalOpen = e => {
    const curentImage = images.find(image => {
      return image.webformatURL === e.target.src;
    });

    modalOpen(curentImage);
  };

  return images.map(image => {
    return (
      <GalleryItem key={image.webformatURL}>
        <Image
          src={image.webformatURL}
          alt={image.tags}
          onClick={hendelModalOpen}
        />
      </GalleryItem>
    );
  });
}

ImageGalleryItem.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
