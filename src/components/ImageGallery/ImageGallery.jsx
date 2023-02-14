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
