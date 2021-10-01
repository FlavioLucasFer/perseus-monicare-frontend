import './index.css';

import { useState } from 'react';

import { Formik } from 'formik';
import { Field } from 'formik-antd'
import { Form, Input, Button, Checkbox } from 'antd';

import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router';


const UserLogin = () => {
  const history = useHistory();

  function initialState() {
    return { 
      username: '', 
      password: '' 
    };
  }

  return (
    <div className='container-login'>
      <h1> MoniCare </h1>

      <div className='user-login border-0'>
        <Formik initialValues={initialState}>
          {(values) => {
            return (
              <Form>
                <Form.Item name='username'>

                  <Input placeholder='Login'
                    size='large'
                    prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item name='password'>
                  <Input.Password placeholder='Senha'
                    size='large'
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
            
                <Form.Item>
                  <Button type='primary'
                    onClick={() => {
                      history.push('/');
                    }}>
                    Entrar
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default UserLogin;  