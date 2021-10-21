import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";

export function SendMessageForm() {

  const [ message, setMessage ] = useState('');
  const [ sendingMessage, setSendingMessage ] = useState(false);

  async function handleMessageSubmit() {
    const messageTrimmed = message.trim();

    if (messageTrimmed.length > 0) {
      setSendingMessage(true);
      await api.post('messages', { message: messageTrimmed });

      setMessage('');
      Keyboard.dismiss();
      setSendingMessage(false);
    }
  }

  return (
    <View style={ styles.container }>
      <TextInput
        style={ styles.input }
        keyboardAppearance='dark'
        placeholder="Qual sua expectativa para o evento?"
        multiline
        maxLength={ 140 }
        placeholderTextColor={ COLORS.GRAY_PRIMARY }
        editable={ !sendingMessage }
        onChangeText={ setMessage }
        value={ message }
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={ COLORS.PINK }
        color={ COLORS.WHITE }
        isLoading={ sendingMessage }
        onPress={ handleMessageSubmit }
      />
    </View>
  );
}