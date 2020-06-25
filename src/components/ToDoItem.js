import React, { useState } from 'react';
import Button from '../components/Button';
import ItemForm from '../components/ItemForm';
import { MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Collapse from "@kunukn/react-collapse";
import '../styles/dashboard.scss';

export default function ToDoItem(props) {
  const { title, completionDate, completionTime } = props;
  const [completed, setCompleted] = useState(false);
  const [editAppear, setEditAppear] = useState(false);
  const [open, setOpen] = useState(false);

  // const [title, setTitle] = useState(props.title);
  // const [completionTime, setCompletionTime] = useState(props.completionTime);
  // const [completionDate, setCompletionDate] = useState(props.completionDate);

  /*
  const markCompleted = (e) => {
    firebase.database().ref(`todos/${username}/${k}/`).update({
      completed: true
    });
    setCompleted(true);
  }
  */

  /*
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
  */
  const openCollapsible = (e) => {
    setOpen(!open);
  }

  return (
    <div className={'todo' + (open ? '-open' : '')}>
      <div className='title' onClick={openCollapsible}>{title}</div>
      <div className='info'>
        <p>Completion Time: {completionTime == 1 ? completionTime + ' hour' : completionTime + ' hours'}</p>
        <p>Completion Date: {completionDate}</p>
        <p>Completed: {completed ? "Yes" : "No"}</p>
        <div className='buttons-container'>
          <MDBIcon className='button' onClick={() => props.changeEditItem(props.k)} far icon='edit'/>
          <MDBIcon className='button' onClick={() => props.markIncomplete(props.k, setCompleted)} far icon='square'/>
          <MDBIcon className='button' onClick={() => props.markCompleted(props.k, setCompleted)} far icon='check-square'/>
          <MDBIcon className='button' onClick={() => props.removeItem(props.k)} far icon='trash-alt'/>
        </div>
      </div>
    </div>
  );
}
