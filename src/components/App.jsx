import { Component } from 'react';
import { fetchImagesByQuery } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    error: null,
    showLoadMore: false,
    isLoading: false,
    showModal: false,
    dataImage: {
      id: '',
      url: '',
      description: '',
    },
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      try {
        const { hits, totalHits } = await fetchImagesByQuery(query, page);
        // console.log(hits);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showLoadMore: page < Math.ceil(totalHits / 15),
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  getQuery = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      error: null,
      showLoadMore: false,
      isLoading: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = data => {
    // console.log(data);
    this.setState({
      showModal: true,
      dataImage: data,
    });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isLoading, showLoadMore, showModal, images, dataImage } =
      this.state;
    return (
      <div className="App">
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.getQuery} />
        {images.length > 0 ? (
          <ImageGallery onClick={this.openModal} images={images} />
        ) : (
          <p>Enter your request</p>
        )}
        {showLoadMore && <Button onClick={this.handleLoadMore} />}

        {showModal && (
          <Modal
            url={dataImage.url}
            description={dataImage.description}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}
