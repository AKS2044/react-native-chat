import React from "react";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {
  BlockView,
  RegisterView,
  SubtitleLinkText,
  SubtitleText,
  SubtitleView,
  SumbitButton,
  TitleText,
} from "./Styles/RegisterStyle";
import Input from "../components/input/Input";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../redux/Auth/selectors";
import { useAppDispatch } from "../redux/store";

const RegisterScreen = () => {
  const { navigate } = useNavigation();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const { data } = useSelector(selectLoginData);

  if (isAuth) {
    navigate("Profile", { userName: data.userName });
  }

  return (
    <RegisterView>
      <BlockView>
        <TitleText>Register</TitleText>
        <Input placeholder="Login" />
        <Input placeholder="E-mail" />
        <Input placeholder="Password" password />
        <Input placeholder="Password confirm" password />
        <SumbitButton title="Register" color={COLORS.pink} disabled={false} />
        <SubtitleView>
          <SubtitleText>
            Log in:{" "}
            <SubtitleLinkText onPress={() => navigate("Login")}>
              Here
            </SubtitleLinkText>
          </SubtitleText>
        </SubtitleView>
      </BlockView>
    </RegisterView>
  );
};

export default RegisterScreen;
