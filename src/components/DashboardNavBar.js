import React from 'react';
import Button from '../components/Button';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { StickyContainer, Sticky } from "react-sticky";
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import '../styles/homepage.scss';

export default function DashboardNavBar(props) {

  const { nameAsc, timeDesc, dateDesc, nameSort, dateSort, timeSort, completedSort, username, changeAppear, logout } = props;

  const NameSort = React.forwardRef(function NameSort(props, ref) {
    return <div {...props} ref={ref}><Button className='button' label='Sort By Name' onClick={nameSort}/></div>
  });

  const DateSort = React.forwardRef(function DateSort(props, ref) {
    return <div {...props} ref={ref}><Button className='button' label='Sort By Date' onClick={dateSort}/></div>
  });

  const TimeSort = React.forwardRef(function TimeSort(props, ref) {
    return <div {...props} ref={ref}><Button className='button' label='Sort By Time' onClick={timeSort}/></div>
  });

  const CompletedSort = React.forwardRef(function CompletedSort(props, ref) {
    return <div {...props} ref={ref}><Button className='button' label='Completed' onClick={completedSort}/></div>
  });

  return (
    <StickyContainer>
      <AppBar className='nav-bar' position='sticky' color='white'>
        <Toolbar>
          <div>
            <p className='title'>{`Welcome ${username}`}</p>
          </div>
          <div className='buttons-container'>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title='View Completed Tasks' arrow>
              <CompletedSort/>
            </Tooltip>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={nameAsc ? 'Ascending' : 'Descending'} arrow>
              <NameSort/>
            </Tooltip>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={dateDesc ? 'Descending' : 'Ascending'} arrow>
              <DateSort/>
            </Tooltip>
            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={timeDesc ? 'Descending' : 'Ascending'} arrow>
              <TimeSort/>
            </Tooltip>
            <Button className='button' label='Add Task' onClick={changeAppear}/>
            <Button className='button' label='Logout' onClick={logout}/>
          </div>
        </Toolbar>
      </AppBar>
    </StickyContainer>
  );
}
