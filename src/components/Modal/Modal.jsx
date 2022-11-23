import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { Overlay, ModalWindow } from './Modal.styled';

function Modal({ onClose, largeImage}) {
  useEffect(() => {
    window.addEventListener('keydown', this.handleKeydown);
    return function cleanup() {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
     onClose();
    }
  };

    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={largeImage} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }


export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
