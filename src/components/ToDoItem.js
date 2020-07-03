import React, { useState } from 'react';
import Button from '../components/Button';
import ItemForm from '../components/ItemForm';
import { MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Collapse from "@kunukn/react-collapse";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import '../styles/dashboard.scss';

export default function ToDoItem(props) {
  const { title, completionDate, completionTime, removeItem, markCompleted, markIncomplete, changeEditItem, k, completed } = props;

  const [editAppear, setEditAppear] = useState(false);
  const [open, setOpen] = useState(false);

  const openCollapsible = (e) => {
    setOpen(!open);
  }

  const Edit = React.forwardRef(function Edit(props, ref) {
    return <div {...props} ref={ref}><MDBIcon className='button' onClick={() => changeEditItem(k)} far icon='edit'/></div>
  });

  const Uncheck = React.forwardRef(function Uncheck(props, ref) {
    return <div {...props} ref={ref}><MDBIcon className='button' onClick={() => markIncomplete(k)} far icon='square'/></div>
  });

  const Check = React.forwardRef(function Check(props, ref) {
    return <div {...props} ref={ref}><MDBIcon className='button' onClick={() => markCompleted(k)} far icon='check-square'/></div>
  });

  const Trash = React.forwardRef(function Trash(props, ref) {
    return <div {...props} ref={ref}><MDBIcon className='button' onClick={() => removeItem(k)} far icon='trash-alt'/></div>
  });

  return (
    <div className={'todo' + (open ? '-open' : '')}>
      <div className='title' onClick={openCollapsible}>{completed ? <i class="fas fa-check"></i> : ''}{title}</div>
      <div className='info'>
        <p>Completion Time: {completionTime == 1 ? completionTime + ' hour' : completionTime + ' hours'}</p>
        <p>Completion Date: {completionDate}</p>
        <p>Completed: {completed ? "Yes" : "No"}</p>
        <div className='buttons-container'>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='Edit Task' arrow>
            <Edit/>
          </Tooltip>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='Mark Incomplete' arrow>
            <Uncheck/>
          </Tooltip>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='Mark Complete' arrow>
            <Check/>
          </Tooltip>
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='Delete Task' arrow>
            <Trash/>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
