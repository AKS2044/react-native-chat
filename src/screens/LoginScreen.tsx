import React from "react";
import { COLORS } from "../constants/colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { InputProps } from "./types/types";

const LoginView = styled.View`
  flex: 1;
  background: ${COLORS.primary};
`;

const SubtitleView = styled.View`
  flex-wrap: wrap;
`;

const SubtitleText = styled.Text`
  margin-top: 20px;
  font-weight: 300;
  color: ${COLORS.white};
`;

const SubtitleLinkText = styled.Text`
  color: ${COLORS.pink};
  text-decoration: underline;
`;

const BlockView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.Text`
  color: ${COLORS.white};
  margin-bottom: 25px;
  font-size: 30px;
  font-weight: 700;
`;

const SumbitButton = styled.Button`
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 40px;
  background: ${COLORS.secondary};
`;

const InputText = styled.TextInput.attrs((props: InputProps) => ({
  secureTextEntry: props.password ? true : false,
  placeholderTextColor: COLORS.lightGray,
}))`
  color: ${COLORS.white};
  font-size: 18px;
  margin-bottom: 15px;
  padding-right: 10px;
  padding-left: 10px;
  background: ${COLORS.secondary};
  border: 1px;
  border-style: solid;
  border-color: ${COLORS.pink};
  border-radius: 4px;
  width: 80%;
  height: 50px;
`;

const LoginScreen = () => {
  const { navigate } = useNavigation();
  return (
    <LoginView>
      <BlockView>
        <TitleText>Log in</TitleText>
        <InputText placeholder="Login" />
        <InputText placeholder="Password" password />
        <SumbitButton title="Log in" color={COLORS.pink} disabled={false} />
        <SubtitleView>
          <SubtitleText>
            Registration:{" "}
            <SubtitleLinkText onPress={() => navigate("Register")}>
              Here
            </SubtitleLinkText>
          </SubtitleText>
        </SubtitleView>
      </BlockView>
    </LoginView>
  );
};

export default LoginScreen;
