import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import image from '../assets/office.jpg';
import Modal from '../components/Modal';
import SignInModal from '../components/SignInModal';
import Text from '../components/Text';
import TextField from '@material-ui/core/TextField';
import NavBar from '../components/NavBar';
import LoginForm from '../components/LoginForm';
import productivity from '../assets/productivity.png';
import '../styles/homepage.scss';
import firebase from '../firebase.js';

function HomePage(props) {

  const { history, username, setUsername } = props;

  const [ loginOpen, setLoginOpen ] = useState(false);
  const [ signInOpen, setSignInOpen ] = useState(false);

  const openLogin = (e) => {
    
    setLoginOpen(true);
  }

  const closeLogin = (e) => {
    setLoginOpen(false);
  }

  const openSignIn = (e) => {
    setSignInOpen(true);
  }

  const closeSignIn = (e) => {
    setSignInOpen(false);
  }

  return (
    <div className='home'>
      <div>
        <NavBar openLogin={openLogin} openSignIn={openSignIn}/>
      </div>
      <div className='home-page'>
        <Modal isOpen={loginOpen} onRequestClose={closeLogin} username={username} setUsername={setUsername}/>
        <SignInModal isOpen={signInOpen} onRequestClose={closeSignIn}/>
      </div>
    </div>
  );
}

export default withRouter(HomePage);
