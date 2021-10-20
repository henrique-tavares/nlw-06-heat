import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import logoImg from '../../assets/logo.svg';
import { api } from "../../services/api";
import { io } from "socket.io-client";

type Message = {
  id: string,
  text: string,
  user: {
    name: string,
    avatar_url: string;
  };
};

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
});

export function MessageList() {

  const [ last3Messages, setLast3Messages ] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setLast3Messages(prevState => [
          messagesQueue[ 0 ],
          prevState[ 0 ],
          prevState[ 1 ]
        ].filter(Boolean));

        messagesQueue.shift();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setLast3Messages(response.data);
    });
  }, []);

  return (
    <div className={ styles.messageListWrapper }>
      <img src={ logoImg } alt="DoWhile 2021" />

      <ul className={ styles.messageList }>

        { last3Messages.map(message => (
          <li key={ message.id } className={ styles.message }>
            <p className={ styles.messageContent }>{ message.text }</p>
            <div className={ styles.messageUser }>
              <div className={ styles.userImage }>
                <img src={ message.user.avatar_url } alt={ message.user.name } />
              </div>
              <span>{ message.user.name }</span>
            </div>
          </li>
        )) }
      </ul>
    </div>
  );
}