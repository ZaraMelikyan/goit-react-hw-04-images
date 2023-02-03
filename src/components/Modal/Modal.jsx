import { Image, Overlay } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

 function Modal({ image, tags, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const clickOnBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <Overlay onClick={clickOnBackdrop}>
        <div>
          <Image src={image} alt={tags} />
        </div>
      </Overlay>,
      modalRoot
    );
  }


export default Modal;

Modal.propTypes = {
  image: PropTypes.string,
  tags: PropTypes.string,
};