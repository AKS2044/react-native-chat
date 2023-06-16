import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import smile from "../images/smiling.png";
import Button from "../components/ui/button/Button";
import GestureRecognizer from "react-native-swipe-gestures";
import { FlatList, TouchableOpacity, Animated } from "react-native";
import {
  ChatView,
  EmojiImage,
  InfoBarView,
  InputFullView,
  ItemNameText,
  ItemPhotoImage,
  JoinView,
  MessagesView,
  SmileImage,
  SmilesView,
  TextInfo,
  TextInput,
  TextView,
  UserIsOnlineView,
  UsersBarItemView,
  UsersBarView,
  WhoIsOnlineText,
} from "./Styles/ChatStyle";
import { MessageParams, UsersCheck } from "../redux/Chat/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectChatData } from "../redux/Chat/selectors";
import { useAppDispatch } from "../redux/store";
import {
  fetchAddMessageChat,
  fetchDeleteChat,
  fetchEnterTheChat,
  fetchGetChat,
  fetchLeaveTheChat,
  fetchMessageList,
  fetchUsersInChat,
} from "../redux/Chat/asyncActions";
import { selectLoginData } from "../redux/Auth/selectors";
import Messages from "../components/messages/Messages";
import instance from "../axios";
import Loader from "../components/loader/Loader";
import { COLORS } from "../constants/colors";

const ChatScreen = () => {
  const { handleSubmit } = useForm<MessageParams>({
    mode: "onChange",
  });

  const uri = instance.getUri().slice(0, -4);
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<UsersCheck[]>([]);
  const [connection, setConnection] = useState<HubConnection>();
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

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const latestChat = useRef<MessageParams[]>([]);
  latestChat.current = chatik;

  const {
    messages,
    chat,
    usersChat,
    statusDeleteMessage,
    statusEnterChat,
    statusChatMes,
    statusGetMessagesChat,
    statusDeleteChat,
  } = useSelector(selectChatData);

  const { statusAuth, data } = useSelector(selectLoginData);

  const pathSmiles = [
    { uri: require("../images/smiles/smile1.png"), smile: "smile1" },
    { uri: require("../images/smiles/smile2.png"), smile: "smile2" },
    { uri: require("../images/smiles/smile3.png"), smile: "smile3" },
    { uri: require("../images/smiles/smile4.png"), smile: "smile4" },
    { uri: require("../images/smiles/smile5.png"), smile: "smile5" },
    { uri: require("../images/smiles/smile6.png"), smile: "smile6" },
    { uri: require("../images/smiles/smile7.png"), smile: "smile7" },
    { uri: require("../images/smiles/smile8.png"), smile: "smile8" },
    { uri: require("../images/smiles/smile9.png"), smile: "smile9" },
  ];

  const getMessages = async () => {
    await dispatch(fetchMessageList({ chatId: chatId }));
    await dispatch(fetchGetChat({ chatId: chatId }));
    await dispatch(fetchUsersInChat({ chatId: chatId }));
  };

  //Hub connection builder
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${uri}/chat`, {
        accessTokenFactory: () => (data.token ? data.token : "Unauthorized"),
      })
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  // Get messages
  useEffect(() => {
    getMessages();
  }, [statusDeleteMessage, statusEnterChat]);

  // Сonnection
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke("OnConnectedAsync", "chat" + chatId);
        })
        .then(() => {
          connection.on("ConnectedAsync", (message) => {
            const info: string[] = [];
            if (info) {
              setConnectedInfo(true);
              info.push(message);
              setConnected(info);
              const timer = setTimeout(() => {
                setConnectedInfo(false);
              }, 2000);
              return () => clearTimeout(timer);
            }
          });
        })
        .then(() => {
          connection.on("SendCheckUsers", (message) => {
            setUsers(message);
          });
        })
        .then(() => {
          connection.on("DisconnectedAsync", (message) => {
            const info: string[] = [];
            setDisconnectedInfo(true);
            info.push(message);
            setDisconnected(info);
            const timer = setTimeout(() => {
              setDisconnectedInfo(false);
            }, 2000);
            return () => clearTimeout(timer);
          });
        })
        .then(() => {
          connection.on("ReceiveMessage", (message) => {
            const updatedChat: MessageParams[] = [...latestChat.current];
            updatedChat.push(message);
            setChatik(updatedChat);
          });
        })
        .catch((err) => console.log("Connection failed: ", err));

      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  // Set messages in state "chatik" and map in Messages component
  useEffect(() => {
    if (messages.length) {
      setChatik(messages);
    }
  }, [messages]);

  const onSubmit = async () => {
    const last = chatik
      ? chatik[chatik.length - 1]
      : messages[messages.length - 1];

    const message: MessageParams = {
      id: last.id + 1,
      chatId: chatId,
      userName: data.userName,
      chatName: chat.nameChat,
      message: textInput,
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
    setTextInput("");
  };

  const config = {
    directionalOffsetThreshold: 140,
  };

  const onClickJoinChat = async () => {
    await dispatch(fetchEnterTheChat({ userId: data.id, chatId: chatId }));
  };

  const onClickLeaveChat = async () => {
    await dispatch(fetchLeaveTheChat({ userId: data.id, chatId: chatId }));
  };

  const onPressDeleteChat = async () => {
    await dispatch(fetchDeleteChat({ chatId })).then(() => {
      if (statusDeleteChat === "completed")
        navigate("Profile", { userName: data.userName });
    });
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      setWatchAll(!watchAll);
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <ChatView>
      <Header userName={data.userName} chatName={chatName} />
      {watchAll && (
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <GestureRecognizer
            config={config}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              zIndex: 4,
            }}
            onSwipeUp={() => {
              fadeOut();
            }}
          >
            <UsersBarView>
              <FlatList
                data={usersChat}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigate("Profile", { userName: item.userName })
                    }
                  >
                    <UsersBarItemView key={item.id}>
                      <ItemPhotoImage
                        source={{ uri: `${uri}${item.pathPhoto}` }}
                      />
                      <ItemNameText>{item.userName}</ItemNameText>
                      <UserIsOnlineView
                        style={
                          Boolean(
                            users.find((u) => u.userName === item.userName)
                          )
                            ? { backgroundColor: COLORS.green }
                            : { backgroundColor: COLORS.error }
                        }
                      />
                    </UsersBarItemView>
                  </TouchableOpacity>
                )}
              />
            </UsersBarView>
          </GestureRecognizer>
        </Animated.View>
      )}
      <InfoBarView>
        <WhoIsOnlineText>Members: {users.length}</WhoIsOnlineText>
        <Button
          onPress={() => {
            fadeIn();
            setWatchAll(!watchAll);
          }}
          disabled={false}
          width="20%"
          height="100%"
        >
          Open
        </Button>
        {(chat.chatCreator === data.id ||
          data.roles.find((r) => r === "ADMIN")) && (
          <Button
            onPress={() => onPressDeleteChat()}
            disabled={false}
            width="20%"
            height="100%"
          >
            Delete
          </Button>
        )}
        {usersChat.find((u) => u.id === data.id) && (
          <Button
            onPress={() => onClickLeaveChat()}
            disabled={false}
            width="20%"
            height="100%"
          >
            Leave
          </Button>
        )}
      </InfoBarView>
      <MessagesView>
        <Messages messages={chatik} />
        {connectedInfo && (
          <FlatList
            data={connected}
            renderItem={({ item }) => <TextInfo>{item}</TextInfo>}
          />
        )}
        {disconnectedInfo && (
          <FlatList
            data={disconnected}
            renderItem={({ item }) => <TextInfo>{item}</TextInfo>}
          />
        )}
      </MessagesView>
      {usersChat.find((u) => u.id === data.id) ? (
        <TextView>
          <InputFullView>
            {smilesOpen && (
              <SmilesView>
                {pathSmiles.map((item, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      setTextInput(textInput.concat(`:${item.smile}:`))
                    }
                    key={i}
                  >
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
          <Button
            disabled={!Boolean(textInput)}
            onPress={handleSubmit(onSubmit)}
            width="20%"
            height={40}
          >
            Send
          </Button>
        </TextView>
      ) : (
        <JoinView>
          <Button
            onPress={() => onClickJoinChat()}
            disabled={false}
            width="40%"
            height="50%"
          >
            Join
          </Button>
        </JoinView>
      )}
    </ChatView>
  );
};

export default ChatScreen;
