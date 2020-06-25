import React from 'react';
import Button from '../components/Button';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import '../styles/homepage.scss';

export default function DashboardNavBar(props) {

  return (
    <AppBar className='nav-bar' position="static" color='white'>
      <Toolbar>
        <p className='title'>{`Welcome ${props.username}`}</p>
        <div className='buttons-container'>
          <Button className='button' label='Add Task' onClick={props.changeAppear}/>
          <Button className='button' label='Logout' onClick={props.logout}/>
        </div>
      </Toolbar>
    </AppBar>
  );
}
