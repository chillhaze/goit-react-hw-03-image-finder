// import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className="btn_wrapper">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};
