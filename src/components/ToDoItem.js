import React, { useState } from 'react';
import Button from '../components/Button';
import ItemForm from '../components/ItemForm';
import { MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/dashboard.scss';

export default function ToDoItem(props) {
  const { id, title, completionDate, completionTime } = props;
  const [completed, setCompleted] = useState(false);
  const [editAppear, setEditAppear] = useState(false);

  const markCompleted = (e) => {
    setCompleted(true);
  }

  const markIncomplete = (e) => {
    setCompleted(false);
  }

  return (
    <div className="todo-list-item-container">
      <div>
        { false && <ItemForm id={id}/> }
      </div>
      <p className="title">{title}</p>
      <div className="subtext">
        <p>Completion Time: {completionTime == 1 ? completionTime + ' hour' : completionTime + ' hours'}</p>
        <p>Completion Date: {completionDate}</p>
        <p>Completed: {completed ? "Yes" : "No"}</p>
      </div>
      <div className='buttons-container'>
        <MDBIcon className='button' onClick={() => props.changeEditItem(id)} far icon='edit'/>
        <MDBIcon className='button' onClick={markIncomplete} far icon='square'/>
        <MDBIcon className='button' onClick={markCompleted} far icon='check-square'/>
        <MDBIcon className='button' onClick={() => props.onClick(id)} far icon='trash-alt'/>
      </div>
    </div>
  );
}
