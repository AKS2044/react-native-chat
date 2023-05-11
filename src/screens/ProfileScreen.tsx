import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../constants/colors";
import photoUser from "../images/RickMorti8.png";

const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary};
  color: ${COLORS.white};
`;
const PhotoUser = styled.Image`
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.pink};
  border-radius: 150px;
  width: 300px;
  height: 300px;
`;

const ProfileScreen = () => {
  return (
    <MainView>
      <PhotoUser source={photoUser} />
    </MainView>
  );
};

export default ProfileScreen;
