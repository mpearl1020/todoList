import React, { useState } from 'react';
import '../styles/text.scss';
import '../styles/login.scss';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import Text from '../components/Text';
import firebase from '../firebase.js';

function SignInForm(props) {

  const { history } = props;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const emailChange = (e) => {
    setEmail(e.target.value);
  }

  const userChange = (e) => {
    setUsername(e.target.value);
  }

  const passChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = () => {
    const userRef = firebase.database().ref('user');
    userRef.orderByChild('username').equalTo(username).once('value', function(snapshot) {
      if (snapshot.exists()) {
        alert('User Already Exists');
      } else {
        const newAccount = {
          username: username,
          email: email,
          password: password
        }
        userRef.push(newAccount);
      }
    });
  }

  return (
    <div className='login-form-container'>
      <label className='text'>Start Your To Do List</label>
      <input className='text-container' type='text' value={email} onChange={emailChange} placeholder='Email'></input>
      <input className='text-container' type='password' value={password} onChange={passChange} placeholder='Password'></input>
      <input className='text-container' type='text' value={username} onChange={userChange} placeholder='Make a Username'></input>
      <Button label='Sign Up' onClick={handleSubmit}/>
    </div>
  )
}

export default withRouter(SignInForm);
