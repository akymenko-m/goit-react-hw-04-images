import { Component } from 'react';
import PropTypes from 'prop-types';

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    // console.log(event.code);
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    // console.log(event.target);
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, description } = this.props;
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={url} alt={description} />
        </div>
      </div>
    );
  }
}
