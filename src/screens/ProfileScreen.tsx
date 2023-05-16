import React, { useState } from "react";
import photoUser from "../images/RickMorti8.png";
import Header from "../components/Header";
import Button from "../components/ui/button/Button";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import Loader from "../components/loader/Loader";
import { useNavigation } from "@react-navigation/native";
import {
  BlockView,
  ButtonsView,
  ChatItemText,
  ChatItemView,
  ChatsView,
  PhotoChat,
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
} from "./Styles/ProfileStyle";

type ItemsProps = {
  id?: string;
  photo: any;
  name: string;
  date: string;
};

const ProfileScreen = () => {
  const [timer, SetTimer] = useState(false);
  const { navigate } = useNavigation();
  const items: ItemsProps[] = [
    { id: "1", photo: photoUser, name: "Name chat1", date: "10 march. 2023" },
    { id: "2", photo: photoUser, name: "Name chat2", date: "10 march. 2023" },
    { id: "3", photo: photoUser, name: "Name chat3", date: "10 march. 2023" },
    { id: "4", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "5", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "6", photo: photoUser, name: "Name chat4", date: "10 march. 2023" },
    { id: "7", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "8", photo: photoUser, name: "Name chat5", date: "10 march. 2023" },
    { id: "9", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "10", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "11", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "12", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "13", photo: photoUser, name: "Name chat", date: "10 march. 2023" },
    { id: "14", photo: photoUser, name: "Last", date: "10 march. 2023" },
  ];

  const data = () => {
    SetTimer(true);
    const timer = setTimeout(() => {
      SetTimer(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const Item = ({ name, date, photo }: ItemsProps) => (
    <ChatItemView>
      <PhotoChat source={photo} />
      <ChatItemText>{name}</ChatItemText>
      <ChatItemText>{date}</ChatItemText>
      <Button width="20%">Leave</Button>
    </ChatItemView>
  );

  if (timer) {
    return <Loader />;
  }
  return (
    <ProfileView>
      <Header />
      <BlockView>
        <PhotoUser source={photoUser} />
        <ProfileItemsView>
          <ProfileTextView>
            <ProfileText>Login:</ProfileText>
            <ProfileText>test</ProfileText>
          </ProfileTextView>
          <ProfileTextView>
            <ProfileText>E-mail:</ProfileText>
            <ProfileText>test@test.tu</ProfileText>
          </ProfileTextView>
          <ProfileTextView>
            <ProfileText>Date register:</ProfileText>
            <ProfileText>24 march 2023</ProfileText>
          </ProfileTextView>
          <ProfileTextView>
            <ProfileText>Role:</ProfileText>
            <ProfileText>user</ProfileText>
          </ProfileTextView>
        </ProfileItemsView>
      </BlockView>
      <ButtonsView>
        <Button width="49%">Create chat</Button>
        <Button width="49%">Change photo</Button>
      </ButtonsView>
      <TitleBlockView>
        <TitleText>My chats</TitleText>
      </TitleBlockView>
      <SearchView>
        <SearchInput placeholder="Search..." />
        <SearchCross>⛌</SearchCross>
      </SearchView>
      <ChatsView>
        <FlatList
          data={items}
          refreshControl={
            <RefreshControl refreshing={timer} onRefresh={data} />
          }
          renderItem={(items) => (
            <TouchableOpacity
              onPress={() => navigate("Chat", { chatName: "Chat tst2" })}
            >
              <Item
                name={items.item.name}
                date={items.item.date}
                photo={items.item.photo}
              />
            </TouchableOpacity>
          )}
        />
      </ChatsView>
    </ProfileView>
  );
};

export default ProfileScreen;
