import React, { useState } from 'react';
import '../styles/text.scss';

export default function Text(props) {

  Text.defaultProps = {
    type: 'password'
  }

  const { type, label, value } = props;
  const [currText, setCurrText] = useState('');


  const onChange = (e) => {
    setCurrText(e.target.value);
  }

  return (
    <div className='text-container'>
      <p className='text-label'>{label}</p>
      <input className='curr-text' type={type} value={currText} onChange={onChange}/>
    </div>
  )
}
