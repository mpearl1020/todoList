import React, { useState } from 'react';
import '../styles/button.scss';

export default function Button(props) {

  const { label, onClick } = props;

  return (
    <div className='button-container' onClick={onClick}>
      <p className='button-label'>{label}</p>
    </div>
  )
}
