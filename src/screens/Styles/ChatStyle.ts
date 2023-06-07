import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

export const ChatView = styled.View`
  flex: 1;
  width: 100%;
  background: ${COLORS.primary};
`;

export const InputFullView = styled.View`
  flex: 1;
`;

export const MessagesView = styled.View`
  padding-bottom: 10px;
  justify-content: space-between;
  flex: 1;
`;

export const SmileImage = styled.Image`
  position: absolute;
  z-index: 2;
  top: 3px;
  right: 11px;
  width: 22px;
  height: 22px;
`;

export const TextView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;
  min-height: 70px;
  background: ${COLORS.secondary};
`;

export const TextInput = styled.TextInput`
  color: ${COLORS.white};
  background: ${COLORS.primary};
  border-radius: 12px;
  font-size: 15px;
  padding-right: 10px;
  padding-left: 10px;
  border-width: 1px;
  border-color: ${COLORS.gray};
  min-height: 50px;
  width: 98%;
`;

export const SmilesView = styled.View`
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  position: absolute;
  z-index: 3;
  right: 0;
  top: -100px;
  border-radius: 12px;
  padding: 5px;
  width: 85px;
  height: 85px;
  border-width: 1px;
  border-color: ${COLORS.gray};
  background: ${COLORS.secondary};
`;

export const EmojiImage = styled.Image`
  width: 22px;
  height: 22px;
`;
