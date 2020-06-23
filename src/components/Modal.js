import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';
import { withRouter } from 'react-router-dom';
import '../styles/login.scss';
import firebase from '../firebase.js';

export default ({ isOpen, onRequestClose, username, setUsername }) =>

{
  console.log(username);
  console.log(setUsername);
  return (
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
      <LoginForm username={username} setUsername={setUsername}/>
    </Modal>
  )
}
