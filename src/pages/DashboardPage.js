import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import ToDoItem from '../components/ToDoItem';
import Button from '../components/Button';
import ItemForm from '../components/ItemForm';
import AddItem from '../components/AddItem';
import NavBar from '../components/DashboardNavBar';
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import image from '../assets/desk.jpg';
import '../styles/homepage.scss';
import '../styles/dashboard.scss';
import firebase from '../firebase.js';

function DashboardPage(props) {

  const { username, history } = props;

  const [selectedItem, setSelectedItem] = useState(-1);

  const [appear, setAppear] = useState(false);
  const [editAppear, setEditAppear] = useState(false);

  const [itemText, setItemText] = useState('');
  const [date, setDate] = useState(new Date());
  const [completed, setCompleted] = useState(false);
  const [timeText, setTimeText] = useState('');
  const [priority, setPriority] = useState(-1);

  const [nameAsc, setNameAsc] = useState(true);
  const [dateDesc, setDateDesc] = useState(true);
  const [timeDesc, setTimeDesc] = useState(true);

  const [id, setId] = useState(0);

  const[items, setItems] = useState(null);

  useEffect(() => {
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
  }, [username])

  const itemChange = (e) => {
    setItemText(e.target.value);
  }

  const dateChange = (d) => {
    setDate(d);
  }

  const timeChange = (e) => {
    setTimeText(e.target.value);
  }

  const priortityChange = (e) => {
    console.log(e.target.value);
    setPriority(e.target.value);
  }

  const changeAppear = (e) => {
    setAppear(true);
  }

  const changeEditItem = (k) => {
    setEditAppear(true);
    setSelectedItem(k);
  }

  const markCompleted = (k) => {
    firebase.database().ref(`todos/${username}/${k}`).update({
      completed: true
    });
    setCompleted(true);
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
  }

  const markIncomplete = (k) => {
    firebase.database().ref(`todos/${username}/${k}`).update({
      completed: false
    });
    setCompleted(false);
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
  }

  const removeItem = (k) => {
    firebase.database().ref(`todos/${username}/${k}`).remove();
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
  }

  const editItem = (k) => {
    firebase.database().ref(`todos/${username}/${k}`).update({
      completionDate: date.toISOString().split('T')[0],
      completionTime: timeText,
      title: itemText
    });
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
  }

  const toDoComponents = items && Object.entries(items).map(([inx, obj]) => {
    return (
        <ToDoItem removeItem={removeItem}
          markCompleted={markCompleted}
          markIncomplete={markIncomplete}
          changeEditItem={changeEditItem}
          editItem={editItem}
          k={inx}
          id={obj['id']}
          title={obj['title']}
          completionDate={obj['completionDate']}
          completionTime={obj['completionTime']}
          completed={obj['completed']}
          open={obj['open']}
        />
    );
  });

  const addItem = (e) => {
    const newItem = {
      id: id,
      title: itemText,
      completionTime: timeText,
      completionDate: date.toISOString().split('T')[0],
      completed: false,
      open: false
    };
    setId(id + 1);
    const todoRef = firebase.database().ref(`todos/${username}`);
    todoRef.push(newItem);
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
  }

  const closeAdd = (e) => {
    setAppear(false);
  }

  const closeEdit = (e) => {
    setEditAppear(false);
  }

  const nameSort = (e) => {
    const entries = Object.entries(items);
    var sorted = null;
    if (nameAsc) {
      sorted = entries.sort((a, b) => (a[1].title > b[1].title) ? 1 : ((b[1].title > a[1].title) ? -1 : 0));
      setNameAsc(false);
    } else {
      sorted = entries.sort((a, b) => (a[1].title > b[1].title) ? -1 : ((b[1].title > a[1].title) ? 1 : 0));
      setNameAsc(true);
    }
    setItems(Object.fromEntries(sorted));
  }

  const dateSort = (e) => {
    const entries = Object.entries(items);
    var sorted = null;
    if (dateDesc) {
      sorted = entries.sort((a, b) => Date.parse(b[1].completionDate) - Date.parse(a[1].completionDate));
      setDateDesc(false);
    } else {
      sorted = entries.sort((a, b) => Date.parse(a[1].completionDate) - Date.parse(b[1].completionDate));
      setDateDesc(true);
    }
    setItems(Object.fromEntries(sorted));
  }


  const timeSort = (e) => {
    const entries = Object.entries(items);
    var sorted = null;
    if (timeDesc) {
      sorted = entries.sort((a, b) => parseFloat(b[1].completionTime) - parseFloat(a[1].completionTime));
      setTimeDesc(false);
    } else {
      sorted = entries.sort((a, b) => parseFloat(a[1].completionTime) - parseFloat(b[1].completionTime));
      setTimeDesc(true);
    }
    setItems(Object.fromEntries(sorted));
  }

  const completedSort = (e) => {
    const entries = Object.entries(items);
    const sorted = entries.sort((a, b) => (+b[1].completed) - (+a[1].completed));
    setItems(Object.fromEntries(sorted));
  }

  const logout = (e) => {
    history.push('/');
  }

  return (
    <div className='dashboard'>
      <div>
        <NavBar username={username} logout={logout} changeAppear={changeAppear} nameSort={nameSort} timeSort={timeSort} dateSort={dateSort} nameAsc={nameAsc} timeDesc={timeDesc} dateDesc={dateDesc} completedSort={completedSort}/>
      </div>
      <div className='dashboard-page'>
        <div className='todo-container'>
          <div>{ toDoComponents }</div>
        </div>
        <AddModal isOpen={appear} submitLabel='Add New Task' onRequestClose={closeAdd} itemText={itemText} date={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='New Task' handleSubmit={addItem}/>
        <EditModal isOpen={editAppear} submitLabel='Apply Changes' onRequestClose={closeEdit} itemText={itemText} dateText={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='Edit Task' handleSubmit={() => editItem(selectedItem)}/>
      </div>
    </div>
  )
}

export default withRouter(DashboardPage);
