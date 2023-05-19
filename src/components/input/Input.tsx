import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";
import { Noop } from "react-hook-form";

export const InputText = styled.TextInput.attrs(() => ({
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
  secureTextEntry?: Boolean | undefined;
  placeholder: string;
  value: string;
  isAuth?: Boolean;
  onBlur?: Noop;
  onChange?: (...event: any[]) => void;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  secureTextEntry,
  onBlur,
  onChange,
}) => {
  return (
    <InputText
      placeholder={placeholder}
      secureTextEntry={secureTextEntry ? true : false}
      value={value}
      onBlur={onBlur}
      onChangeText={onChange}
    />
  );
};

export default Input;
