import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import smile from "../images/smiling.png";
import Button from "../components/ui/button/Button";
import { TouchableOpacity } from "react-native";
import {
  ChatView,
  EmojiImage,
  InputFullView,
  MessagesView,
  SmileImage,
  SmilesView,
  TextInput,
  TextView,
} from "./Styles/ChatStyle";
import { MessageParams, UsersCheck } from "../redux/Chat/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectChatData } from "../redux/Chat/selectors";
import { useAppDispatch } from "../redux/store";
import {
  fetchAddMessageChat,
  fetchGetChat,
  fetchMessageList,
  fetchUsersInChat,
} from "../redux/Chat/asyncActions";
import { selectLoginData } from "../redux/Auth/selectors";
import Messages from "../components/messages/Messages";

const ChatScreen = () => {
  const { handleSubmit } = useForm<MessageParams>({
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<UsersCheck[]>([]);
  const [connection, setConnection] = useState<HubConnection>();
  const [text, setText] = useState("");
  const [connected, setConnected] = useState<string[]>([]);
  const [disconnected, setDisconnected] = useState<string[]>([]);
  const [chatik, setChatik] = useState<MessageParams[]>([]);
  const [connectedInfo, setConnectedInfo] = useState(false);
  const [watchAll, setWatchAll] = useState(false);
  const [disconnectedInfo, setDisconnectedInfo] = useState(false);
  const dateNow = Date.now();
  const date = new Date(dateNow);

  const route = useRoute<RouteProp<RootStackParamList, "Chat">>();
  const { chatId, chatName } = route.params;

  const { navigate } = useNavigation();
  const [smilesOpen, setSmilesOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const latestChat = useRef<MessageParams[]>([]);
  latestChat.current = chatik;

  const {
    messages,
    chat,
    usersChat,
    statusDeleteMessage,
    statusEnterChat,
    statusChatMes,
  } = useSelector(selectChatData);

  const { statusAuth, data } = useSelector(selectLoginData);

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

  const getMessages = async () => {
    await dispatch(fetchMessageList({ chatId: chatId }));
    await dispatch(fetchGetChat({ chatId: chatId }));
    await dispatch(fetchUsersInChat({ chatId: chatId }));
  };

  // Get messages
  useEffect(() => {
    getMessages();
  }, [statusDeleteMessage, statusChatMes, statusEnterChat]);

  //Hub connection builder
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7275/chat", {
        accessTokenFactory: () => (data.token ? data.token : "Unauthorized"),
      })
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);

  // Сonnection
  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         connection.invoke("OnConnectedAsync", "chat" + chatId);
  //       })
  //       .then(() => {
  //         connection.on("ConnectedAsync", (message) => {
  //           const info: string[] = [];
  //           if (info) {
  //             setConnectedInfo(true);
  //             info.push(message);
  //             setConnected(info);
  //             const timer = setTimeout(() => {
  //               setConnectedInfo(false);
  //             }, 2000);
  //             return () => clearTimeout(timer);
  //           }
  //         });
  //       })
  //       .then(() => {
  //         connection.on("SendCheckUsers", (message) => {
  //           setUsers(message);
  //         });
  //       })
  //       .then(() => {
  //         connection.on("DisconnectedAsync", (message) => {
  //           const info: string[] = [];
  //           setDisconnectedInfo(true);
  //           info.push(message);
  //           setDisconnected(info);
  //           const timer = setTimeout(() => {
  //             setDisconnectedInfo(false);
  //           }, 2000);
  //           return () => clearTimeout(timer);
  //         });
  //       })
  //       .then(() => {
  //         connection.on("ReceiveMessage", (message) => {
  //           const updatedChat: MessageParams[] = [...latestChat.current];
  //           updatedChat.push(message);
  //           setChatik(updatedChat);
  //         });
  //       })
  //       .catch((err) => console.log("Connection failed: ", err));

  //     return () => {
  //       connection.stop();
  //     };
  //   }
  // }, [connection]);

  // Set messages in state "chatik" and map in Messages component
  useEffect(() => {
    if (messages.length) {
      setChatik(messages);
    }
  }, [messages]);

  const onSubmit = async () => {
    const last = chatik.length
      ? chatik[chatik.length - 1]
      : messages[messages.length - 1];

    const message: MessageParams = {
      id: last.id + 1,
      chatId: chatId,
      userName: data.userName,
      chatName: chat.nameChat,
      message: text,
      dateWrite: date.toLocaleTimeString(),
      pathPhoto: data.pathPhoto,
    };

    await dispatch(fetchAddMessageChat(message));
    if (connection?.start) {
      try {
        await connection.send("SendMessage", message);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
    setText("");
  };

  return (
    <ChatView>
      <Header chatName={chatName} />
      <MessagesView>
        <Messages messages={messages} />
      </MessagesView>
      <TextView>
        <InputFullView>
          {smilesOpen && (
            <SmilesView>
              {pathSmiles.map((item, i) => (
                <TouchableOpacity key={i}>
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
        <Button onPress={handleSubmit(onSubmit)} width="20%">
          Send
        </Button>
      </TextView>
    </ChatView>
  );
};

export default ChatScreen;
