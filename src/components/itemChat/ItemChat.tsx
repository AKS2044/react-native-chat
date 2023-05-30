import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import { ChatParams } from "../../redux/Chat/types";

const ChatItemView = styled.View`
  align-items: center;
  justify-content: space-between;
  background: ${COLORS.secondary};
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.primary};
  flex-direction: row;
  padding: 5px;
`;

const ChatItemText = styled.Text`
  color: ${COLORS.white};
  font-size: 16px;
`;

const PhotoChat = styled.Text`
  border-width: 1px;
  border-color: ${COLORS.pink};
  border-radius: 150px;
  background: ${COLORS.red};
  text-align: center;
  font-size: 28px;
  text-transform: uppercase;
  text-align-vertical: center;
  color: ${COLORS.lightGray1};
  width: 64px;
  height: 64px;
`;

const ItemChat: React.FC<ChatParams> = ({ dateCreat, nameChat, id }) => {
  const photoChat = nameChat[0] + nameChat[nameChat.length - 1];
  return (
    <ChatItemView key={id}>
      <PhotoChat>{photoChat}</PhotoChat>
      <ChatItemText>{nameChat}</ChatItemText>
      <ChatItemText>{dateCreat}</ChatItemText>
    </ChatItemView>
  );
};

export default ItemChat;
