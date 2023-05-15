import React, { useState } from "react";
import styled from "styled-components/native";
import { COLORS } from "../constants/colors";
import photoUser from "../images/RickMorti8.png";
import Header from "../components/Header";
import Button from "../components/ui/button/Button";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import Loader from "../components/loader/Loader";
import { useNavigation } from "@react-navigation/native";

const ProfileView = styled.View`
  flex: 1;
  width: 100%;
  background: ${COLORS.primary};
  color: ${COLORS.white};
`;

const BlockView = styled.View`
  width:100%
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
`;

const ProfileTextView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.pink};
  flex-direction: row;
  height: 30px;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

const ProfileItemsView = styled.View`
  flex: 1;
  margin-left: 5px;
`;

const ProfileText = styled.Text`
  color: ${COLORS.white};
`;

const ButtonsView = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: 700;
`;

const TitleBlockView = styled.View`
  color: ${COLORS.white};
  background: ${COLORS.pink};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

const SearchView = styled.View``;

const SearchCross = styled.Text`
  position: absolute;
  right: 10px;
  font-size: 28px;
  color: ${COLORS.lightGray};
`;

const SearchInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: COLORS.lightGray,
}))`
  color: ${COLORS.white};
  background: ${COLORS.secondary};
  font-size: 18px;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.pink};
  height: 50px;
`;

const ChatsView = styled.View`
  flex: 1;
`;

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

const PhotoUser = styled.Image`
  border-width: 1px;
  border-color: ${COLORS.pink};
  border-radius: 150px;
  width: 130px;
  height: 130px;
`;

const PhotoChat = styled.Image`
  border-width: 1px;
  border-color: ${COLORS.pink};
  border-radius: 150px;
  width: 64px;
  height: 64px;
`;

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
