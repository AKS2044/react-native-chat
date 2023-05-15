import React, { useState } from "react";
import Header from "../components/Header";
import { COLORS } from "../constants/colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { InputProps } from "./types/types";

const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary};
  color: ${COLORS.white};
`;

const BlockView = styled.View`
  justify-content: space-evenly;
  padding-top: 25px;
  width: 80%;
  align-items: center;
  flex-direction: row;
`;

const WelcomeText = styled.Text`
  text-align: center;
  font-weight: 700;
  color: ${COLORS.white};
  width: 80%;
  font-size: 30px;
`;

const SumbitPressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${COLORS.gray};
  border-radius: 4px;
  width: 49%;
  height: 40px;
  background: ${COLORS.secondary};
`;

const SumbitText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
`;

const MainScreen = () => {
  const { navigate } = useNavigation();
  const [isAuth, SetIsAuth] = useState(true);
  return (
    <MainView>
      <WelcomeText>Welcome to the react chat app</WelcomeText>
      <BlockView>
        {isAuth ? (
          <SumbitPressable onPress={() => navigate("Profile")}>
            <SumbitText>Profile</SumbitText>
          </SumbitPressable>
        ) : (
          <>
            <SumbitPressable onPress={() => navigate("Login")}>
              <SumbitText>Log in</SumbitText>
            </SumbitPressable>
            <SumbitPressable onPress={() => navigate("Register")}>
              <SumbitText>Register</SumbitText>
            </SumbitPressable>
          </>
        )}
      </BlockView>
    </MainView>
  );
};

export default MainScreen;
