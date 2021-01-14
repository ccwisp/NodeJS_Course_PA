import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { InfoBar } from '../InfoBar/InfoBar';
import { Input } from '../Input/Input';
import { Messages } from '../Messages/Messages';
import { TextContainer } from '../TextContainer/TextContainer';

import './Chat.css';

let socket;

export const Chat = () => {
  const ENDPOINT = 'https://socket-vgp2m.ondigitalocean.app/';

  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = currentUser.accessToken;
    const name = currentUser.login;
    socket = io(ENDPOINT);
    setName(name);
    socket.on('server ready', function (msg) {
      console.log('Server is ready!\n', msg);
      socket.emit('comms', {
        msg: 'Client is Ready',
      });
    });

    socket.on('connect-error', function (err) {
      console.log('Connection Error\n', err);
    });

    socket.on('error', function (err) {
      console.log('Connection Error\n', err);
    });

    socket.emit('join', token, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [isLoggedIn]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on('data', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    const token = currentUser.accessToken;
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, token, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <TextContainer users={users} />
      <div className="container">
        <InfoBar />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
