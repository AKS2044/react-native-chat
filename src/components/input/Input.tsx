import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";

export const InputText = styled.TextInput.attrs((props: InputProps) => ({
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

type InputProps = {
  password?: string;
  placeholder: string;
  value: string;
  isAuth?: Boolean;
};

const Input: React.FC<InputProps> = ({ password, placeholder, value }) => {
  return (
    <InputText
      placeholder={placeholder}
      secureTextEntry={password ? true : false}
      value={value}
    />
  );
};

export default Input;
