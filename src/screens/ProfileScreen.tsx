import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/ui/button/Button";
import {
  FlatList,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import Loader from "../components/loader/Loader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  BlockView,
  ButtonsView,
  ChatsView,
  PhotoUser,
  ProfileItemsView,
  ProfileText,
  ProfileTextView,
  ProfileView,
  SearchCross,
  SearchInput,
  SearchView,
  TitleBlockView,
  TitleText,
  InputChat,
} from "./Styles/ProfileStyle";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../redux/Auth/selectors";
import { selectChatData } from "../redux/Chat/selectors";
import { RootStackParamList } from "../navigation/types";
import { fetchGetProfile, fetchUploadPhoto } from "../redux/Auth/asyncActions";
import {
  fetchChatsUser,
  fetchCreateChat,
  fetchSearchChat,
} from "../redux/Chat/asyncActions";
import instance from "../axios";
import { AddChatParams } from "../redux/Chat/types";
import ItemChat from "../components/itemChat/ItemChat";
import Modal from "../components/modal/Modal";
import { COLORS } from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { setErrorCreateChat } from "../redux/Chat/slice";
import { setuploadPhotoError } from "../redux/Auth/slice";

const ProfileScreen = () => {
  const uri = instance.getUri().slice(0, -4);
  const formData = new FormData();
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    profile,
    profileStatus,
    data,
    statusAuth,
    uploadPhotoError,
    uploadPhotoStatus,
  } = useSelector(selectLoginData);
  const {
    userChats,
    statusAddChat,
    searchChat,
    statusEnterChat,
    statusLeaveChat,
    createChatError,
  } = useSelector(selectChatData);

  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const { userName } = route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const [search, setSearch] = useState("");
  const [addChat, setAddChat] = useState("");
  const { navigate } = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.assets) {
      let photo = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: result.assets[0].uri.replace(/.*ImagePicker./, ""),
      };
      formData.append("file", photo as unknown as File);
    }
  };

  const onSubmit = async () => {
    await dispatch(fetchUploadPhoto({ formData, token: data.token }));
    await dispatch(fetchGetProfile({ userName: userName }));
    setModalPhoto(!modalPhoto);
  };

  useEffect(() => {
    if (createChatError.message) {
      Alert.alert("Warning", createChatError.message, [
        {
          text: "OK",
          onPress: async () => {
            await dispatch(setErrorCreateChat());
          },
        },
      ]);
    }

    if (uploadPhotoError.message) {
      Alert.alert("Warning", uploadPhotoError.message, [
        {
          text: "OK",
          onPress: async () => {
            await dispatch(setuploadPhotoError());
          },
        },
      ]);
    }
  }, [createChatError]);

  useEffect(() => {
    dispatch(setErrorCreateChat());
    dispatch(setuploadPhotoError());
  }, []);

  const getProfile = async () => {
    if (userName) {
      await dispatch(fetchGetProfile({ userName: userName }));
      await dispatch(fetchChatsUser({ userName: userName }));
    } else if (statusAuth === "completed") {
      await dispatch(fetchGetProfile({ userName: userName }));
      await dispatch(fetchChatsUser({ userName: userName }));
    }
  };

  const onClickCreateChat = async () => {
    if (addChat) {
      const chat: AddChatParams = { nameChat: addChat };
      await dispatch(fetchCreateChat(chat));
      setAddChat("");
      setModal(!modal);
    }
  };

  const searchChatAsync = async () => {
    await dispatch(fetchSearchChat({ chatName: search }));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    getProfile();
  }, [statusEnterChat, statusLeaveChat, statusAuth, statusAddChat, userName]);

  useEffect(() => {
    if (search) {
      searchChatAsync();
    }
  }, [search]);

  if (!isAuth) {
    navigate("Login");
  }

  return (
    <>
      {profileStatus === "completed" ? (
        <ProfileView>
          {modal && (
            <Modal
              element={
                <>
                  <InputChat
                    value={addChat}
                    onChangeText={(tx) => setAddChat(tx)}
                    placeholderTextColor={COLORS.lightGray}
                    placeholder="Enter the name"
                  />
                  <SearchCross onPress={() => setModal(!modal)}>⛌</SearchCross>
                  <Button
                    onPress={() => onClickCreateChat()}
                    width="49%"
                    height={40}
                  >
                    Create chat
                  </Button>
                </>
              }
              title="Enter the name chat"
            ></Modal>
          )}
          {modalPhoto && (
            <Modal
              element={
                <>
                  <SearchCross onPress={() => setModalPhoto(!modalPhoto)}>
                    ⛌
                  </SearchCross>
                  <Button width="49%" height={40} onPress={() => pickImage()}>
                    Choose photo
                  </Button>
                  <Button width="49%" height={40} onPress={() => onSubmit()}>
                    Upload
                  </Button>
                </>
              }
              title="Change your avatar"
            ></Modal>
          )}
          {uploadPhotoStatus === "loading" && (
            <ActivityIndicator
              size="large"
              style={{
                position: "absolute",
                zIndex: 5,
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                backgroundColor: COLORS.bgModal,
              }}
            />
          )}
          <Header userName={data.userName} />
          <BlockView>
            <PhotoUser source={{ uri: `${uri}${profile.pathPhoto}` }} />
            <ProfileItemsView>
              <ProfileTextView>
                <ProfileText>Login:</ProfileText>
                <ProfileText>{profile.userName}</ProfileText>
              </ProfileTextView>
              <ProfileTextView>
                <ProfileText>E-mail:</ProfileText>
                <ProfileText>{profile.email}</ProfileText>
              </ProfileTextView>
              <ProfileTextView>
                <ProfileText>Date register:</ProfileText>
                <ProfileText>{profile.dateReg}</ProfileText>
              </ProfileTextView>
              <ProfileTextView>
                <ProfileText>Role:</ProfileText>
                <ProfileText>
                  <FlatList
                    data={profile.roles}
                    renderItem={({ item }) => <ProfileText>{item}</ProfileText>}
                  />
                </ProfileText>
              </ProfileTextView>
            </ProfileItemsView>
          </BlockView>
          <ButtonsView>
            <Button onPress={() => setModal(!modal)} width="49%" height={40}>
              Create chat
            </Button>
            <Button
              onPress={() => setModalPhoto(!modalPhoto)}
              width="49%"
              height={40}
            >
              Change photo
            </Button>
          </ButtonsView>
          <TitleBlockView>
            {data.userName === userName ? (
              <TitleText>My chats</TitleText>
            ) : (
              <TitleText>{`${userName}'s chats`}</TitleText>
            )}
          </TitleBlockView>
          {data.userName === userName && (
            <SearchView
              style={
                search && isKeyboardVisible
                  ? { position: "absolute", width: "100%" }
                  : { position: "relative" }
              }
            >
              <SearchInput
                placeholder="Search..."
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <SearchCross onPress={() => setSearch("")}>⛌</SearchCross>
            </SearchView>
          )}
          <ChatsView
            style={
              search && isKeyboardVisible
                ? {
                    position: "absolute",
                    top: 50,
                    width: "100%",
                    height: "100%",
                  }
                : { position: "relative" }
            }
          >
            {search ? (
              <FlatList
                data={searchChat}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigate("Chat", {
                        chatId: item.id,
                        chatName: item.nameChat,
                      })
                    }
                  >
                    <ItemChat
                      nameChat={item.nameChat}
                      dateCreat={item.dateCreat}
                      chatCreator={item.chatCreator}
                      id={item.id}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <FlatList
                data={userChats}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigate("Chat", {
                        chatId: item.id,
                        chatName: item.nameChat,
                      })
                    }
                  >
                    <ItemChat
                      nameChat={item.nameChat}
                      dateCreat={item.dateCreat}
                      chatCreator={item.chatCreator}
                      id={item.id}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </ChatsView>
        </ProfileView>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfileScreen;
