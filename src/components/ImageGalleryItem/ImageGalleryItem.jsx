import { GalleryItem, ImageGallery } from './ImageGalleryItem.styled';

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ small, name, large, onClick }) => {
  return (
    <GalleryItem>
      <ImageGallery src={small} alt={name} id={large} onClick={onClick} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  small: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
