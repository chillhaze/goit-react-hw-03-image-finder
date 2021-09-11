// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, tag }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img src={src} alt={tag} className="ImageGalleryItem-image" />
    </li>
  );
};
