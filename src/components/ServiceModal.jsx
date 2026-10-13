import React from 'react';
import { X } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, title, services }) => {
  if (!isOpen) return null;

  return (
    <div className="service-modal-overlay" onClick={onClose}>
      <div
        className="service-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="service-modal__head">
          <h3 className="service-modal__title">{title}</h3>
          <button
            onClick={onClose}
            className="service-modal__close"
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <ul className="service-modal__list">
          {services.map((service, index) => (
            <li key={index} className="service-modal__item">
              <span className="service-modal__dot" />
              <span className="service-modal__text">{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceModal;