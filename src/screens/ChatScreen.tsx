import React, { useState } from "react";
import styled from "styled-components/native";
import { COLORS } from "../constants/colors";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../navigation/types";
import photoUser from "../images/RickMorti8.png";
import smile from "../images/smiling.png";
import Button from "../components/ui/button/Button";
import { FlatList, TouchableOpacity } from "react-native";

const ChatView = styled.View`
  flex: 1;
  width: 100%;
  background: ${COLORS.primary};
`;

const MessagesView = styled.View`
  padding: 10px;
  flex: 1;
`;

const MessageFullView = styled.View`
  align-items: flex-start;
  flex-direction: row;
`;

const MessagePhotoImage = styled.Image`
  width: 48px;
  margin-right: 5px;
  border-radius: 50px;
  border-width: 1px;
  border-color: ${COLORS.pink};
  height: 48px;
`;
const InputFullView = styled.View`
  flex: 1;
`;

const SmileImage = styled.Image`
  position: absolute;
  z-index: 2;
  top: 3px;
  right: 11px;
  width: 22px;
  height: 22px;
`;

const MessageView = styled.View`
  background: rgba(244, 123, 123, 0.2);
  padding: 3px;
  padding-left: 5px;
  min-width: 100px;
  max-width: 90%;
  min-height: 60px;
  border-color: ${COLORS.pink};
  border-width: 1px;
  border-radius: 12px;
`;

const UserNameText = styled.Text`
  font-size: 11px;
  opacity: 0.7;
  color: ${COLORS.white};
`;

const MessageText = styled.Text`
  color: ${COLORS.white};
`;

const DateText = styled.Text`
  opacity: 0.6;
  font-size: 11px;
  color: ${COLORS.white};
`;

const SearchCross = styled.Text`
  position: absolute;
  right: 8px;
  top: -5px;
  font-size: 20px;
  color: ${COLORS.lightGray};
`;

const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;
  min-height: 70px;
  background: ${COLORS.secondary};
`;

const TextInput = styled.TextInput`
  color: ${COLORS.white};
  background: ${COLORS.primary};
  border-radius: 12px;
  font-size: 18px;
  padding-right: 10px;
  padding-left: 10px;
  border-width: 1px;
  border-color: ${COLORS.gray};
  min-height: 50px;
  width: 98%;
`;

const SmilesView = styled.View`
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 65px;
  border-radius: 12px;
  width: 100px;
  height: 100px;
  border-width: 1px;
  border-color: ${COLORS.gray};
`;

const ChatScreen = () => {
  const { navigate } = useNavigation();
  const [smilesOpen, setSmilesOpen] = useState(false);

  const pathSmiles = [{ uri: "../../assets/smiles/smile1.png" }];
  const route = useRoute<RootRouteProps<"Chat">>();
  const { chatName } = route.params;
  return (
    <ChatView>
      <Header chatName={chatName} />
      <MessagesView>
        <MessageFullView>
          <MessagePhotoImage source={photoUser} />
          <MessageView>
            <UserNameText>User name</UserNameText>
            <MessageText>
              Hello world!Hello world!Hello world!Hello world!Hello world!Hello
              world!Hello world!Hello world!Hello world!Hello world!Hello
              world!Hello world!Hello world!
            </MessageText>
            <DateText>21.02.33</DateText>
            <SearchCross>⛌</SearchCross>
          </MessageView>
        </MessageFullView>
      </MessagesView>
      <TextView>
        <InputFullView>
          {smilesOpen && (
            <SmilesView>
              {/* <SmileImage source={require(item.uri)} /> */}
            </SmilesView>
          )}
          <TouchableOpacity
            style={{ zIndex: 1 }}
            onPress={() => {
              setSmilesOpen(!smilesOpen);
            }}
          >
            <SmileImage source={smile} />
          </TouchableOpacity>
          <TextInput />
        </InputFullView>
        <Button width="20%">Send</Button>
      </TextView>
    </ChatView>
  );
};

export default ChatScreen;
