import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootRouteProps } from "../navigation/types";
import photoUser from "../images/RickMorti8.png";
import smile from "../images/smiling.png";
import Button from "../components/ui/button/Button";
import { TouchableOpacity } from "react-native";
import {
  ChatView,
  DateText,
  EmojiImage,
  InputFullView,
  MessageFullView,
  MessagePhotoImage,
  MessageText,
  MessageView,
  MessagesView,
  SearchCross,
  SmileImage,
  SmilesView,
  TextInput,
  TextView,
  UserNameText,
} from "./Styles/ChatStyle";

const ChatScreen = () => {
  const { navigate } = useNavigation();
  const [smilesOpen, setSmilesOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const pathSmiles = [
    { uri: require("../../assets/smiles/smile1.png") },
    { uri: require("../../assets/smiles/smile2.png") },
    { uri: require("../../assets/smiles/smile3.png") },
    { uri: require("../../assets/smiles/smile4.png") },
    { uri: require("../../assets/smiles/smile5.png") },
    { uri: require("../../assets/smiles/smile6.png") },
    { uri: require("../../assets/smiles/smile7.png") },
    { uri: require("../../assets/smiles/smile8.png") },
    { uri: require("../../assets/smiles/smile9.png") },
  ];

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
        <MessageFullView
          style={{
            flexDirection: "row-reverse",
          }}
        >
          <MessagePhotoImage source={photoUser} />
          <MessageView>
            <UserNameText>User name</UserNameText>
            <MessageText>Hello world!</MessageText>
            <DateText>21.02.33</DateText>
            <SearchCross>⛌</SearchCross>
          </MessageView>
        </MessageFullView>
      </MessagesView>
      <TextView>
        <InputFullView>
          {smilesOpen && (
            <SmilesView>
              {pathSmiles.map((item, i) => (
                <TouchableOpacity key={i} onPress={() => navigate("Profile")}>
                  <EmojiImage source={item.uri} />
                </TouchableOpacity>
              ))}
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
          <TextInput
            multiline={true}
            numberOfLines={textInput.length > 33 ? 3 : 1}
            onChangeText={(text) => setTextInput(text)}
            value={textInput}
          />
        </InputFullView>
        <Button width="20%">Send</Button>
      </TextView>
    </ChatView>
  );
};

export default ChatScreen;
