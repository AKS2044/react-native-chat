import React from "react";
import styled from "styled-components/native";
import { InputProps } from "./types/types";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const RegisterView = styled.View`
  flex: 1;
  background: ${COLORS.primary};
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

const SumbitButton = styled.Button`
  background: ${COLORS.secondary};
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

const RegisterScreen = () => {
  const { navigate } = useNavigation();
  return (
    <RegisterView>
      <BlockView>
        <TitleText>Register</TitleText>
        <InputText placeholder="Login" />
        <InputText placeholder="E-mail" />
        <InputText placeholder="Password" password />
        <InputText placeholder="Password confirm" password />
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
