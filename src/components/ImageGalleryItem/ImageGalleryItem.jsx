// import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, tag, currentImage }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={src}
        alt={tag}
        onClick={currentImage}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};
