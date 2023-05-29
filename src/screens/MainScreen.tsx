import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  BlockView,
  MainView,
  SumbitPressable,
  SumbitText,
  WelcomeText,
} from "./Styles/MainStyle";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../redux/Auth/selectors";

const MainScreen = () => {
  const { navigate } = useNavigation();
  const isAuth = useSelector(selectIsAuth);
  const { data } = useSelector(selectLoginData);
  return (
    <MainView>
      <WelcomeText>Welcome to the react chat app</WelcomeText>
      <BlockView>
        {isAuth ? (
          <SumbitPressable
            onPress={() => navigate("Profile", { userName: data.userName })}
          >
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
