import React, { useState } from 'react';
import { userAdd } from '../actions/user';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Select,
  Modal,
  Icon,
  Segment,
} from 'semantic-ui-react';
import './loginForm.css';

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
];

function RegisterForm() {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [regError, setRegError] = useState(false);
  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);

  const validate = () => {
    if (login === '' || pass === '') return false;
    return true;
  };

  const userRegisterHandler = () => {
    if (validate()) {
      userAdd(login, pass)
        .then((res) => {
          setRegError(false);
          setName(res);
          document.getElementById('triggerBtn').click();
        })
        .catch((err) => alert(err));
    } else {
      setRegError(true);
    }
  };

  return (
    <div className='RegisterForm'>
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' style={{ color: 'white' }} textAlign='center'>
            Create your Account
          </Header>
          <Form size='large'>
            <Segment inverted stacked>
              <Form.Input
                fluid
                name='login'
                icon='user'
                iconPosition='left'
                placeholder='Your Login'
                onChange={(e) => setLogin(e.target.value)}
              />

              <Form.Input
                fluid
                icon='lock'
                name='password'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(e) => setPass(e.target.value)}
              />

              <Form.Field
                control={Select}
                options={genderOptions}
                label={{
                  htmlFor: 'form-select-control-gender',
                }}
                placeholder='Gender'
                name='sex'
              />

              <Button
                basic
                color='violet'
                fluid
                size='large'
                onClick={userRegisterHandler}
              >
                Register!
              </Button>
              <span style={{ color: 'green' }} hidden={!regError}>
                {' '}
                <h2>
                  <i>Credentials cannot be empty !</i>
                </h2>
              </span>
            </Segment>
          </Form>
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
          Registration went successfully!!
        </Header>
        <Modal.Content>
          <p>
            <h1 color='violet'>Your login is {name} !</h1>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            as={Link}
            to='/'
            color='green'
            inverted
            onClick={() => setOpen(false)}
          >
            <Icon name='checkmark' /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default RegisterForm;
