import React from 'react';
import Modal from 'react-modal';
import ItemForm from '../components/ItemForm';
import '../styles/login.scss';

export default ({ isOpen, onRequestClose, submitLabel, itemText, date, timeText, itemChange, dateChange, timeChange, ph, handleSubmit }) =>

  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={{
      base: 'modal-base',
      afterOpen: 'modal-base_after-open',
      beforeClose: 'modal-base_before-close'
    }}
    overlayClassName={{
      base: 'overlay-base',
      afterOpen: 'overlay-base_after-open',
      beforeClose: 'overlay-base_before-close'
    }}
    shouldCloseOnOverlayClick={true}
    closeTimeoutMS={2000}>
    <ItemForm onRequestClose={onRequestClose} submitLabel={submitLabel} itemText={itemText} date={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='New Task' handleSubmit={handleSubmit}/>
  </Modal>
