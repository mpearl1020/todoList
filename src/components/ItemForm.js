import React, { useState } from 'react';
import { MDBCloseIcon } from "mdbreact"
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Button from '../components/Button';
import Text from '../components/Text';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/dashboard.scss';
import '../styles/text.scss';
import '../styles/login.scss';

export default function ItemForm(props) {

  const { id, selectedItem, onRequestClose, itemText, itemChange, ph, dateChange, date, timeText, timeChange, submitLabel, handleSubmit } = props;

  const valueText = (value) => {
    return `${value}`;
  }

  const classes = withStyles();

  return (
    <div className='login-form-container'>
      <label className='text-label'>Task</label>
      <input className='text-container' type='text' value={itemText} onChange={itemChange} placeholder={ph}></input>
      <label className='text-label'>Completion Date</label>
      <DatePicker className='text-container'
        dateFormat='dd/MM/yyyy'
        onChange={dateChange}
        selected={date}
        value={date}
      />
      <label className='text-label'>Hours to Complete</label>
      <input className='text-container' type='number' value={timeText} onChange={timeChange}></input>
      <div className='row-button-container'>
        <Button label={submitLabel} onClick={handleSubmit}/>
        <Button label='Done' onClick={onRequestClose}/>
      </div>
    </div>
  )
}
