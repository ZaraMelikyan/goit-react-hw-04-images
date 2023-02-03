import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/index';
import { useState } from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ largeImageURL, webformatURL, tags }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(isOpen => !isOpen);
  };


    return (
      <>
        <GalleryItem onClick={toggleModal}>
          <GalleryImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {isOpen && (
          <Modal onClose={toggleModal} image={largeImageURL} tags={tags} />
        )}
      </>
    );
  }


export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

