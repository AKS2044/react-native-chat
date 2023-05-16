import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  BlockView,
  MainView,
  SumbitPressable,
  SumbitText,
  WelcomeText,
} from "./Styles/MainStyle";

const MainScreen = () => {
  const { navigate } = useNavigation();
  const [isAuth, SetIsAuth] = useState(false);
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
