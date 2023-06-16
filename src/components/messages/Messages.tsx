import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectLoginData } from "../../redux/Auth/selectors";
import { fetchDeleteMessage } from "../../redux/Chat/asyncActions";
import { MessageParams } from "../../redux/Chat/types";
import { FlatList, TouchableOpacity } from "react-native";
import instance from "../../axios";
import reactStringReplace from "react-string-replace";
import { useNavigation } from "@react-navigation/native";

export const MessageFullView = styled.View`
  margin-top: 20px;
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
  min-height: 26px;
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
  width: 20px;
  height: 20px;
`;

type MessagesType = {
  messages: MessageParams[];
};

const Messages: React.FC<MessagesType> = ({ messages }) => {
  const pathSmiles = [
    { uri: require("../../images/smiles/smile1.png"), smile: "smile1" },
    { uri: require("../../images/smiles/smile2.png"), smile: "smile2" },
    { uri: require("../../images/smiles/smile3.png"), smile: "smile3" },
    { uri: require("../../images/smiles/smile4.png"), smile: "smile4" },
    { uri: require("../../images/smiles/smile5.png"), smile: "smile5" },
    { uri: require("../../images/smiles/smile6.png"), smile: "smile6" },
    { uri: require("../../images/smiles/smile7.png"), smile: "smile7" },
    { uri: require("../../images/smiles/smile8.png"), smile: "smile8" },
    { uri: require("../../images/smiles/smile9.png"), smile: "smile9" },
  ];

  const dispatch = useAppDispatch();
  const { navigate } = useNavigation();
  const uri = instance.getUri().slice(0, -4);
  const { data } = useSelector(selectLoginData);

  const OnClickDeleteMessage = (messageId: number) => {
    dispatch(fetchDeleteMessage({ messageId }));
  };
  return (
    <FlatList
      inverted
      keyExtractor={(item) => String(item.id)}
      style={{ padding: 10 }}
      data={[...messages].reverse()}
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
                <SmileImage
                  key={i}
                  source={pathSmiles.find((p) => p.smile === match)?.uri}
                />
              ))}
            </MessageText>
            <DateText>{item.dateWrite}</DateText>
            {(item.userName === data.userName ||
              data.roles.find((r) => r === "ADMIN")) && (
              <SearchCross onPress={() => OnClickDeleteMessage(item.id)}>
                ⛌
              </SearchCross>
            )}
          </MessageView>
          <TouchableOpacity
            onPress={() => navigate("Profile", { userName: item.userName })}
          >
            <MessagePhotoImage source={{ uri: `${uri}${item.pathPhoto}` }} />
          </TouchableOpacity>
        </MessageFullView>
      )}
    />
  );
};

export default Messages;
