import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { api } from "../../services/api";
import { Message, MessageProps } from "../Message";
import { styles } from './styles';
import { io } from 'socket.io-client';

const messagesQueue: MessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [ lastMessages, setLastMessages ] = useState<MessageProps[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setLastMessages(prevState => ([
          messagesQueue[ 0 ],
          prevState[ 0 ],
          prevState[ 1 ]
        ]));

        messagesQueue.shift();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    api.get<MessageProps[]>('messages/last3').then(response => {
      setLastMessages(response.data);
    });
  }, []);

  return (
    <ScrollView
      style={ styles.container }
      contentContainerStyle={ styles.content }
      keyboardShouldPersistTaps="never"
    >
      { lastMessages.map(message => (
        <Message key={ message.id } data={ message } />
      )) }

    </ScrollView>
  );
}