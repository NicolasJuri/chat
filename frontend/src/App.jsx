
import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import Chat from './Chat';
import { Button, Form, Card, Icon, Container, Divider } from 'semantic-ui-react';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);


  const joinRoom = ()=> {
    if (username !== "" && room !== "") {
     socket.emit("join_room",room);
     setShowChat(true);
    }
  }

  return (
    <Container>
        {!showChat? (
          <Card fluid>
            <Card.Content header='Chat en vivo' />
            <Card.Content>
                <Form>
                    <Form.Field>
                      <label>Usuario:</label>
                      <input type="text" id="" placeholder='Ingrese su usuario'
                      onChange={e =>setUsername(e.target.value)}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Sala:</label>
                      <input type="text" placeholder='ID sala:'
                      onChange={e => setRoom(e.target.value)}/>
                    </Form.Field>
                    <Button onClick={joinRoom}>Unirme</Button>
                  </Form>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />4 Friends
            </Card.Content>
              </Card>
        ) : (

              <Chat socket={socket} username={username} room={room} /> )}
      </Container>
  );
}

export default App
