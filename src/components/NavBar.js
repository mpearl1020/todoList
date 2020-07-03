import React from 'react';
import Button from '../components/Button';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import '../styles/homepage.scss';

export default function NavBar(props) {

  const {openLogin, openSignIn} = props;

  return (
    <AppBar className='nav-bar' position="static" color='white'>
      <Toolbar>
        <p className='title'>To Do App</p>
        <div className='buttons-container'>
          <Button className='button' label='Login' onClick={openLogin}/>
          <Button className='button' label='Sign Up' onClick={openSignIn}/>
        </div>
      </Toolbar>
    </AppBar>
  );
}
