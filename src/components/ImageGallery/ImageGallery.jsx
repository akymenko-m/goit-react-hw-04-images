import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(el => {
        return (
          <ImageGalleryItem
            onClick={onClick}
            key={el.id}
            webUrl={el.webformatURL}
            largeUrl={el.largeImageURL}
            alt={el.tags}
            id={el.id}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func,
};
