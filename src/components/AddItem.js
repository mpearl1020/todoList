import React, { useState } from 'react';
import { MDBIcon } from 'mdbreact';
import AddIcon from '@material-ui/icons/Add';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../styles/dashboard.scss';

export default function AddItem(props) {

  const {onClick} = props;

  return (
    <div className='add-item'>
      <div className='container'>
        <AddIcon style={{ fontSize: 200 }} onClick={onClick}/>
      </div>
    </div>
  )
}
