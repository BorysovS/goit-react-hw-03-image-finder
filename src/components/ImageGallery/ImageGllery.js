import { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { getImages } from '../ServiceApi/ServiceApi';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

import { Modal } from '../Modal/Modal';

function smoothScroll() {
  const cardHeight = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

export class ImageGallery extends Component {
  state = {
    page: 1,
    items: [],
    isLoading: false,
    visibleBtn: false,
    totalHits: 1,
    status: 'idle',
    error: '',
    modalImage: null,
    modalAlt: null,
    showModal: false,
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { items, page, visibleBtn } = this.state;
    const { value } = this.props;

    if (prevProps.value !== value) {
      this.setState(prevState => ({
        ...prevState,
        items: [],
        page: 1,
        totalHits: 0,
      }));
    }

    if (prevProps.value !== value || prevState.page !== page) {
      this.getFetchApi();
    }

    if (
      items.length !== 0 &&
      !visibleBtn &&
      this.state.totalHits > items.length
    ) {
      this.setState({ visibleBtn: true });
    }
    if (page !== 1) {
      smoothScroll();
    }
  }

  async getFetchApi() {
    try {
      this.setState({ isLoading: true });
      const { page } = this.state;
      const { value } = this.props;
      const data = await getImages(value, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
        totalHits: data.totalHits,
      }));
      if (data.totalHits === 0) {
        toast.error('Nothing was found for your request', { duration: 1000 });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleShowModal = (imageModal, title) => {
    this.toggleModal();
    this.setState({ modalImage: imageModal, modalAlt: title });
  };

  render() {
    const { items, isLoading, visibleBtn } = this.state;
    return (
      <>
        <GalleryList>
          <ImageGalleryItem items={items} onClick={this.handleShowModal} />
        </GalleryList>
        {isLoading && <Loader />}
        {visibleBtn && <Button onClick={this.handleLoadMore} />}
        {this.state.showModal && (
          <Modal
            imageModal={this.state.modalImage}
            title={this.state.modalAlt}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
};
