import React, { useState } from 'react';
import { MDBCloseIcon } from "mdbreact"
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Button from '../components/Button';
import Text from '../components/Text';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/dashboard.scss';
import '../styles/text.scss';

export default function ItemForm(props) {

  const { id, selectedItem } = props;

  return (
    <div className='animate'>
      <div className='form-box'>
        <MDBCloseIcon onClick={props.onClick}/>
        <div className='item-form-container'>
          <form>
            <label className='text-label'>Task</label>
            <input className='text-container' type='text' value={props.itemText} onChange={props.itemChange} placeholder={props.ph}></input>
            <label className='text-label'>Completion Date</label>
            <DatePicker
              dateFormat='dd/MM/yyyy'
              onChange={props.dateChange}
              selected={props.date}
              value={props.date}
            />
            <label className='text-label'>Hours to Complete</label>
            <input className='text-container' type='number' value={props.timeText} onChange={props.timeChange}></input>
            <Button label={props.submitLabel} onClick={props.handleSubmit}/>
          </form>
        </div>
      </div>
    </div>
  )
}
