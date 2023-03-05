import { Component } from 'react';
import { getImages } from '../ServiceApi/ServiceApi';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    page: 1,
    items: [],
    isLoading: false,
    visibleBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { items, page } = this.state;
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.setState({ isLoading: true });
      getImages(value, page)
        .then(data => {
          //   if (data.status !== 'ok') {
          //     return Promise.reject(new Error(data.message));
          //   }
          this.setState(({ items }) => ({
            items: [...items, ...data.hits],
            isLoading: false,
          }));
        })
        .catch(err => console.log(err.message));
    }
  }

  render() {
    return (
      <GalleryList>
        <ImageGalleryItem items={this.state.items} />
        {this.state.isLoading && <Loader />}
        {this.state.visibleBtn && <Button />}
      </GalleryList>
    );
  }
}
