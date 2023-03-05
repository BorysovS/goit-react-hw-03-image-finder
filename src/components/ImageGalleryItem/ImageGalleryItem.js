import { GalleryItemImage, GalleryItem } from './ImaeGalleryItem.styled';

export const ImageGalleryItem = ({ items }) => {
  return items.map(item => {
    return (
      <GalleryItem key={item.id}>
        <GalleryItemImage src={item.webformatURL} alt={item.tags} />
      </GalleryItem>
    );
  });
};
