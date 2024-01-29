import React, { useEffect, useState } from "react";
import { Button, Card, Container, Icon, Form, Input, Message, Divider } from 'semantic-ui-react';
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({socket,username,room})=> {

    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList,setMessageList] = useState([]);

    const sendMessage = async ()=> {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: new Date(Date.now()).getHours()+ ":"+ new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message",info);
            setMessageList((list)=>[...list, info]);
            setCurrentMessage("");
        }
    };

    useEffect(()=>{
        const messageHandle = (data)=>{
                setMessageList((list)=>[...list, data]);
            };
        socket.on("receive_message", messageHandle);

        return () => socket.off("receive_message", messageHandle);
    },[socket])



    return (
        <Container>
            <Card fluid>
                <Card.Content header= {`Chat en vivo | Sala: ${room}`} />
                <ScrollToBottom>
                <Card.Content style={{Height: "400px",padding:"5px"}}>
                    
                    {messageList.map((item,i) =>{
                        return (
                        <span key={i}>
                          <Message style={{textAlign:username===item.author?"right":"left"}}
                          success={username === item.author}
                          info={username != item.author}
                          >
                            <Message.Header>{item.message}</Message.Header>
                            <p>Enviado por: <strong>{item.author}</strong>, a las <i>{item.time}</i></p>
                        </Message>
                        <Divider />
                        </span>
                        );
                    })

                    }
                    
                </Card.Content>
                </ScrollToBottom>
                <Card.Content extra>
                    <Form>
                <Form.Field>
                      <Input     
                      value={currentMessage}
                      action={{
                        color: 'teal',
                        labelPosition: 'right',
                        icon: 'send',
                        content: 'Enviar',
                        onClick: sendMessage,
                        }}
                      type="text"
                      placeholder="Mensaje..." 
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        />
                </Form.Field>
                </Form>
                </Card.Content>
            </Card>
        </Container>
    );
};

export default Chat;