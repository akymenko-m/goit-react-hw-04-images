import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, onClick, webUrl, alt, largeUrl }) => {
  return (
    <>
      <li
        className="ImageGalleryItem"
        id={id}
        onClick={event => {
          const dataImage = {
            id: event.currentTarget.id,
            url: largeUrl,
            description: alt,
          };
          // console.log(dataImage);
          onClick(dataImage);
        }}
      >
        <img src={webUrl} alt={alt} className="ImageGalleryItem-image" />
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
