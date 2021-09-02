import 'materialize-css';
import './index.css';

import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Input from 'components/Input.jsx';

function initialState() {
  return { 
    user: '', 
    password: '' 
  };
}

const UserLogin = () => {
  let [ values, setValues ] = useState(initialState);

  let history = useHistory();

  return (
    <div className='container-login'>
      <div className='user-login'>
        <div className='row'>
          <h1> Acesse o sistema </h1>
        </div>

        <div className='row'>
          <Input label='Usuário'
            id='user'
            name='user'
            type='text'
            icon='person'
            value={values.user}
            onChange={(e) => {
              setValues({
                ...values,
                user: e.target.value
              });
            }} />
        </div>
        
        <div className='row'>
          <Input label='Senha'
            id='password'
            name='password'
            type='password'
            icon='lock'
            value={values.password}
            onChange={(e) => {
              setValues({
                ...values,
                password: e.target.value
              });
            }} />
        </div>
        
        <div className='row'>
          <button className='btn waves-effect waves-light' 
            type='submit' 
            name='action'
            onClick={() => {
              history.push('/');
            }}>
              Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;  