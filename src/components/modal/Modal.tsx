import React, { ReactNode, Ref, RefObject, useRef } from "react";
import styled, {
  DefaultTheme,
  ReactNativeStyledInterface,
} from "styled-components/native";
import { COLORS } from "../../constants/colors";
import { View } from "react-native";

const ModalMainView = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${COLORS.bgModal};
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const ModalView = styled.View`
  background: ${COLORS.secondary};
  justify-content: space-around;
  padding: 10px;
  padding-top: 0;
  align-items: center;
  border-radius: 8px;
  opacity: 1;
  width: 98%;
  min-height: 180px;
`;

const TitleText = styled.Text`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  height: 40px;
  width: 100%;
  text-align: center;
  border-bottom-width: 1px;
  text-align-vertical: center;
  border-color: ${COLORS.gray};
  color: ${COLORS.white};
`;
type ModalProps = {
  title: string;
  children?: string;
  element?: ReactNode;
  ref?: React.Ref<View>;
};
const Modal: React.FC<ModalProps> = ({ title, children, element }) => {
  return (
    <ModalMainView>
      <ModalView>
        <TitleText>{title}</TitleText>
        {element && element}
      </ModalView>
    </ModalMainView>
  );
};

export default Modal;
