import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import ToDoItem from '../components/ToDoItem';
import Button from '../components/Button';
import ItemForm from '../components/ItemForm';
import AddItem from '../components/AddItem';
import NavBar from '../components/DashboardNavBar';
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

  const markCompleted = (k, setter) => {
    firebase.database().ref(`todos/${username}/${k}`).update({
      completed: true
    });
    setter(true);
  }

  const markIncomplete = (k, setter) => {
    firebase.database().ref(`todos/${username}/${k}`).update({
      completed: false
    });
    setter(false);
  }

  // console.log([...Object.entries(items)]);
  // console.log([...Object.entries(items)[0]]) // key

  // pass firebase key to component
  const removeItem = (k) => {
    firebase.database().ref(`todos/${username}/${k}`).remove();
    // setItems([...Object.entries(items).filter(todo => todo[0] !== k)])
    // console.log(items);
    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
    // setItems([...Object.entries(items).filter(todo => todo['id'] !== k)]);
    /*
    console.log(firebase.database().ref('todos').orderByChild(`${username}`));
    firebase.database().ref('todos').orderByChild(`${username}`).on('value', function(snapshot) {
      const todoList = snapshot.val();
      console.log(todoList);
      const key = Object.keys(todoList);
      console.log(key);
    });
    */

  }

  /*
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
  */

  const editItem = (k) => {
    // console.log(k);
    firebase.database().ref(`todos/${username}/${k}`).update({
      completionDate: date.toISOString().split('T')[0],
      completionTime: timeText,
      title: itemText
    });

    firebase.database().ref(`todos/${username}`).once('value').then((snapshot) => {
      setItems(snapshot.val());
    });
    // dateSet(date.toISOString().split('T')[0]);
    // timeSet(timeText);
    // titleSet(itemText);
  }

  const toDoComponents = items && Object.entries(items).map(([inx, obj]) => {
    // const entries = Object.entries(items);
    // console.log(inx); // firebase key
    // console.log(obj);
    // console.log(inx);
    // console.log(firebase.database().ref)
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
      // console.log(snapshot.val());
    });
  }

  // -MAXrzUm4DCGDhJDPTK8

  const closeAdd = (e) => {
    setAppear(false);
  }

  const closeEdit = (e) => {
    setEditAppear(false);
  }

  // firebase.database().ref(`todos/${username}/${k}`).remove();
  // setItems([...Object.entries(items).filter(todo => todo['id'] !== k)]);

  const logout = (e) => {
    console.log('logging out');
    console.log([...Object.entries(items)]);
    console.log([...Object.entries(items)[0]]) // key

    /*
    const t = firebase.database().reference().child
    firebase.database().ref(`todos/${username}/-MAXrzUm4DCGDhJDPTK8`).on('value').then((snapshot) => {
      snapshot.ref().remove();
    })
    */
    // const key = '-MAXrzUm4DCGDhJDPTK8';
    // firebase.database().ref(`todos/${username}/${key}`).remove();
  }

  return (
    <div className='dashboard'>
      <div>
        <NavBar username={username} logout={logout} changeAppear={ changeAppear }/>
      </div>
      <div className='dashboard-page'>
        <div className='todo-container'>
          <p>{ toDoComponents }</p>
        </div>
        { appear && <ItemForm submitLabel='Add New Task' onClick={closeAdd} itemText={itemText} date={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='New Task' handleSubmit={addItem}/> }
        { editAppear && <ItemForm submitLabel='Apply Changes' onClick={closeEdit} itemText={itemText} dateText={date} timeText={timeText} itemChange={itemChange} dateChange={dateChange} timeChange={timeChange} ph='Edit Task' handleSubmit={() => editItem(selectedItem)}/>}
      </div>
    </div>
  )
}

export default withRouter(DashboardPage);
