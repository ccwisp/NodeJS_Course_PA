import React, { useState } from 'react';
import { userLogin } from '../actions/user';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Modal,
  Icon,
} from 'semantic-ui-react';

import './loginForm.css';

function LoginForm() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState(true);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const validate = () => {
    if (login === '' || pass === '') return false;
    return true;
  };

  const userLoginHandler = () => {
    if (validate()) {
      userLogin(login, pass)
        .then((res) => {
          setLoginError(true);
          setName(res);
          document.getElementById('triggerBtn').click();
        })
        .catch((err) => alert(err.response.data));
    } else setLoginError(false);
  };

  return (
    <div className='LoginForm'>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' style={{ color: 'white' }} textAlign='center'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment inverted stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                onChange={(e) => setLogin(e.target.value)}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(e) => setPass(e.target.value)}
              />

              <Button
                basic
                color='violet'
                fluid
                size='large'
                onClick={userLoginHandler}
              >
                Login
              </Button>
              <span style={{ color: 'green' }} hidden={loginError}>
                {' '}
                <h2>
                  <i>Fields cannot be empty</i>
                </h2>
              </span>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to={'/user/register'}>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>

      <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        trigger={
          <button id='triggerBtn' hidden={true}>
            Basic Modal
          </button>
        }
      >
        <Header icon>
          <Icon name='spy' />
          Login approved
        </Header>
        <Modal.Content>
          <p>
            <h1>Welcome {name} :)</h1>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            inverted
            onClick={() => {
              setOpen(false);
            }}
          >
            <Icon name='checkmark' /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default LoginForm;
