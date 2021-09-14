import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Modal extends Component {
  // Вешаю слушателя
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  // Снимаю слуашателя
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // Метод закрытия модального окна по кнопке Esc
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  // Метод закрытия модального окна по бекдропу
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.src} alt={this.props.tag} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  src: PropTypes.string,
  tag: PropTypes.string,
};
