import React, { useState } from 'react';
import '../styles/login.scss';
import '../styles/text.scss';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import Text from '../components/Text';
import firebase from '../firebase.js';

function LoginForm(props) {

  const { history, username, setUsername } = props;

  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [loggedIn, setLoggedIn] = useState('');

  const userChange = (e) => {
    setUsername(e.target.value);
  }

  const passChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    firebase.database().ref('user').orderByChild('username').equalTo(username).on('value', function(snapshot) {
      if (snapshot.exists()) {
        const user = snapshot.val();
        const key = Object.keys(user);
        if (user[key].password === password) {
          history.push('/dashboard');
        } else {
          alert('Incorrect Credentials');
        }
      } else {
        alert('User Does Not Exist');
      }
    });
  }

  return (
    <div className='login-form-container'>
      <label className='text'>Your To Do List</label>
      <input className='text-container' type='text' value={username} onChange={userChange} placeholder='Username'></input>
      <input className='text-container' type='password' value={password} onChange={passChange} placeholder='Password'></input>
      <Button label='Login' onClick={handleSubmit}/>
    </div>
  )
}

export default withRouter(LoginForm);
