import React, { useState } from 'react';
import '../styles/button.scss';

export default function LoginButton(props) {

  const { onClick, label } = props;

  return (
    <div className="button-container" onClick={onClick}>
      <p className="button-label">{label}</p>
    </div>
  )
}
