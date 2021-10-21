import { MotiView } from "@motify/components";
import React from "react";
import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";
import { sytles } from "./styles";

export type MessageProps = {
  id: string,
  text: string,
  user: {
    name: string,
    avatar_url: string;
  };
};

type Props = {
  data: MessageProps;
};

export function Message({ data }: Props) {
  const { text, user } = data;

  return (
    <MotiView
      style={ sytles.container }
      from={ { opacity: 0, translateY: -50 } }
      animate={ { opacity: 1, translateY: 0 } }
    >
      <Text style={ sytles.message }>{ text }</Text>

      <View style={ sytles.footer }>
        <UserPhoto imageUri={ user.avatar_url } sizes='SMALL' />
        <Text style={ sytles.userName }>{ user.name }</Text>
      </View>
    </MotiView>
  );
}