import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import ToDoItem from '../components/ToDoItem';
import Button from '../components/Button';
import ItemForm from '../components/ItemForm';
import AddItem from '../components/AddItem';
import image from '../assets/desk.jpg';
import '../styles/homepage.scss';
import '../styles/dashboard.scss';
import firebase from '../firebase.js';

function DashboardPage(props) {

  const { username } = props;

  const [selectedItem, setSelectedItem] = useState(-1);

  const [appear, setAppear] = useState(false);
  const [editAppear, setEditAppear] = useState(false);

  const [itemText, setItemText] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeText, setTimeText] = useState('');

  const [id, setId] = useState(0);

  const[items, setItems] = useState(null);

  useEffect(() => {
    firebase.database().ref(`todo/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
      console.log(snapshot.val());
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

  const changeAppear = (e) => {
    setAppear(true);
  }

  const changeEditItem = (k) => {
    setEditAppear(true);
    setSelectedItem(k);
  }

  /*
  const dummyToDoItems = [
    {
      id: 0,
      title: "Math Homework",
      completionDate: '2020-06-14',
      completionTime: 1,
      completed: false
    },
    {
      id: 1,
      title: "Science Homework",
      completionDate: '2020-07-15',
      completionTime: 2,
      completed: false
    },
    {
      id: 2,
      title: "Lit Homework",
      completionDate: '2020-08-03',
      completionTime: 1,
      completed: true
    },
  ]
  */


  const removeItem = (k) => {
    setItems([...items.filter(todo => todo['id'] !== k)]);
  }

  const editItem = (k) => {
    console.log('date ' + date);
    for (var i = 0; i < items.length; i++) {
      if (items[i]['id'] == k) {
        items[i].title = itemText;
        items[i].completionTime = timeText;
        items[i].completionDate = date.toISOString().split('T')[0];
      }
    }
  }

  const toDoComponents = items && Object.entries(items).map(([inx, obj]) => {
    return (
        <ToDoItem onClick={removeItem}
          changeEditItem={changeEditItem}
          editItem={editItem}
          key={obj['id']}
          id={obj['id']}
          title={obj['title']}
          completionDate={obj['completionDate']}
          completionTime={obj['completionTime']}
          completed={obj['completed']}
        />
    );
  });

  const addItem = (e) => {
    const newItem = {
      id: id,
      title: itemText,
      completionTime: timeText,
      completionDate: date.toISOString().split('T')[0],
      completed: false
    };
    setId(id => id + 1);
    // setItems([...items, newItem]);
    const todoRef = firebase.database().ref(`todos/${username}`);
    todoRef.push(newItem);
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    })
    // todoRef.push(newItem);

  }

  const closeAdd = (e) => {
    setAppear(false);
  }

  const closeEdit = (e) => {
    setEditAppear(false);
  }

  return (
    <div className='dashboard-page'>
      <div className='todo-list-container'>
        <AddItem onClick={ changeAppear }/>
        <p>{ toDoComponents }</p>
      </div>
      { appear && <ItemForm submitLabel='Add New Task' onClick={closeAdd} itemText={itemText} date={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='New Task' handleSubmit={addItem}/> }
      { editAppear && <ItemForm submitLabel='Apply Changes' onClick={closeEdit} itemText={itemText} dateText={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='Edit Task' handleSubmit={() => editItem(selectedItem)}/>}
    </div>
  )
}

export default withRouter(DashboardPage);
