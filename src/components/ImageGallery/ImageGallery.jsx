import { ImageGalleryList } from './ImageGallery.styled';

import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ImageGalleryList>
      {!!images &&
        images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              name={image.tags}
              small={image.webformatURL}
              large={image.largeImageURL}
              onClick={onClick}
            />
          );
        })}
    </ImageGalleryList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};
