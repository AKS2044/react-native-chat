import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Button from "../components/ui/button/Button";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Keyboard,
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
import { useForm } from "react-hook-form";
import { AddChatParams, SearchParams } from "../redux/Chat/types";
import ItemChat from "../components/itemChat/ItemChat";
import Modal from "../components/modal/Modal";
import { COLORS } from "../constants/colors";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const ProfileScreen = () => {
  const uri = instance.getUri().slice(0, -4);
  const formData = new FormData();
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { profile, profileStatus, data, statusAuth, statusLogout } =
    useSelector(selectLoginData);
  const {
    userChats,
    statusAddChat,
    searchChat,
    statusEnterChat,
    statusLeaveChat,
  } = useSelector(selectChatData);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const route = useRoute<RouteProp<RootStackParamList, "Profile">>();
  const { userName } = route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [timer, setTimer] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(false);
  const [search, setSearch] = useState("");
  const [addChat, setAddChat] = useState("");
  const { navigate } = useNavigation();

  const UploadFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "image/*",
      });
      if (result.type === "success") {
        if (result.uri != null) {
          console.log(result);
          formData.append("file", result as unknown as Blob);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    console.log("eeeeee");
    await dispatch(fetchUploadPhoto(formData));
  };

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
      setModal(!modal);
    }
  };

  const searchChatAsync = async () => {
    await dispatch(fetchSearchChat({ chatName: search }));
  };

  // const dataRefresh = () => {
  //   SetTimer(true);
  //   const timer = setTimeout(() => {
  //     SetTimer(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // };

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
  }, [statusEnterChat, statusLeaveChat, statusAuth, statusAddChat]);

  useEffect(() => {
    if (search) {
      searchChatAsync();
    }
  }, [search]);

  if (timer) {
    <Loader />;
  }

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
                  <Button onPress={() => onClickCreateChat()} width="49%">
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
                  <Button onPress={selectFile} width="49%">
                    Choose photo
                  </Button>
                  <Button onPress={() => onSubmit()} width="49%">
                    Upload
                  </Button>
                </>
              }
              title="Change your avatar"
            ></Modal>
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
            <Button onPress={() => setModal(!modal)} width="49%">
              Create chat
            </Button>
            <Button onPress={() => setModalPhoto(!modalPhoto)} width="49%">
              Change photo
            </Button>
          </ButtonsView>
          <TitleBlockView>
            <TitleText>My chats</TitleText>
          </TitleBlockView>
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
                refreshControl={<RefreshControl refreshing={timer} />}
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
                refreshControl={<RefreshControl refreshing={timer} />}
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
