import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ModalStyle, Overlay } from './Modal.styled';

export function Modal({ closeModal, url, alt }) {
  useEffect(() => {
    function closeEscModal(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', closeEscModal);

    return () => {
      window.removeEventListener('keydown', closeEscModal);
    };
  }, [closeModal]);

  function handleBackDropClick(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }

  return (
    <Overlay onClick={handleBackDropClick}>
      <ModalStyle>
        <img src={url} alt={alt} />
      </ModalStyle>
    </Overlay>
  );
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
