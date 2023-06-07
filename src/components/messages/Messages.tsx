import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../redux/Auth/selectors";
import { fetchDeleteMessage } from "../../redux/Chat/asyncActions";
import { MessageParams } from "../../redux/Chat/types";
import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import instance from "../../axios";
import reactStringReplace from "react-string-replace";

export const MessageFullView = styled.View`
  margin-bottom: 10px;
  justify-content: flex-end;
  flex-direction: row;
`;

export const MessagePhotoImage = styled.Image`
  margin-left: 5px;
  margin-right: 5px;
  width: 48px;
  border-radius: 50px;
  border-width: 1px;
  border-color: ${COLORS.pink};
  background: rgba(244, 123, 123, 0.1);
  height: 48px;
`;

export const MessageView = styled.View`
  background: rgba(244, 123, 123, 0.2);
  padding: 3px;
  padding-left: 5px;
  min-width: 100px;
  min-height: 60px;
  max-width: 89%;
  border-color: ${COLORS.pink};
  border-width: 1px;
  border-radius: 12px;
`;

export const UserNameText = styled.Text`
  font-size: 11px;
  opacity: 0.7;
  color: ${COLORS.white};
`;

export const MessageText = styled.Text`
  color: ${COLORS.white};
`;

export const DateText = styled.Text`
  opacity: 0.6;
  font-size: 11px;
  color: ${COLORS.white};
`;

export const SearchCross = styled.Text`
  position: absolute;
  right: 8px;
  top: -5px;
  font-size: 20px;
  color: ${COLORS.lightGray};
`;

export const SmileImage = styled.Image`
  position: absolute;
  z-index: 2;
  top: 3px;
  right: 11px;
  width: 22px;
  height: 22px;
`;

type MessagesType = {
  messages: MessageParams[];
};

const Messages: React.FC<MessagesType> = ({ messages }) => {
  const dispatch = useAppDispatch();
  const messageRef = useRef<FlatList>(null);
  const uri = instance.getUri().slice(0, -4);
  const { data } = useSelector(selectLoginData);

  const OnClickDeleteMessage = (messageId: number) => {
    dispatch(fetchDeleteMessage({ messageId }));
  };

  //   useEffect(() => {
  //     // if (messageRef && messageRef.current) {
  //     //   const { c } = messageRef.current;
  //     //   window.scrollTo(0, clientHeight);
  //     // }
  //   }, [messages]);
  return (
    <FlatList
      style={{ padding: 10 }}
      data={messages}
      renderItem={({ item }) => (
        <MessageFullView
          key={item.id}
          style={
            item.userName !== data.userName && {
              flexDirection: "row-reverse",
            }
          }
        >
          <MessageView>
            <UserNameText>{item.userName}</UserNameText>
            <MessageText>
              {reactStringReplace(item.message, /:(.+?):/g, (match, i) => (
                <SmileImage source={{}} />
              ))}
            </MessageText>
            <DateText>{item.dateWrite}</DateText>
            <SearchCross onPress={() => OnClickDeleteMessage(item.chatId)}>
              ⛌
            </SearchCross>
          </MessageView>
          <MessagePhotoImage source={{ uri: `${uri}${item.pathPhoto}` }} />
        </MessageFullView>
      )}
    />
  );
};

export default Messages;
