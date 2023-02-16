import { useState, useEffect } from 'react';
import { fetchImagesByQuery } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataImage, setDataImage] = useState({
    id: '',
    url: '',
    description: '',
  });

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImagesByQuery(query, page);
        setImages(prevState => [...prevState, ...hits]);
        setShowLoadMore(page < Math.ceil(totalHits / 15));
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query === '') {
      return;
    }

    fetchImages();
  }, [page, query]);

  const getQuery = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(null);
    setShowLoadMore(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = data => {
    setShowModal(true);
    setDataImage(data);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      {isLoading && <Loader />}
      <Searchbar onSubmit={getQuery} isDisabled={isLoading} />

      {error !== null && <p>Oops, some error occured... Message: {error}</p>}

      {images.length > 0 ? (
        <ImageGallery onClick={openModal} images={images} />
      ) : (
        <p>Enter your request</p>
      )}
      {showLoadMore && <Button onClick={handleLoadMore} />}

      {showModal && (
        <Modal
          url={dataImage.url}
          description={dataImage.description}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
