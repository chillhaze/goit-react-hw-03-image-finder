import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, tag, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={src}
        alt={tag}
        onClick={onClick}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func,
  src: PropTypes.string,
  tag: PropTypes.string,
};
