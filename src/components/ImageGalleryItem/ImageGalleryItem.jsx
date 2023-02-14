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
