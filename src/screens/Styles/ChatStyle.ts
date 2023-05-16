import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

export const ChatView = styled.View`
  flex: 1;
  width: 100%;
  background: ${COLORS.primary};
`;

export const MessagesView = styled.View`
  padding: 10px;
  flex: 1;
`;

export const MessageFullView = styled.View`
  margin-bottom: 10px;
  align-items: flex-start;
  flex-direction: row;
`;

export const MessagePhotoImage = styled.Image`
  margin-left: 5px;
  margin-right: 5px;
  width: 48px;
  border-radius: 50px;
  border-width: 1px;
  border-color: ${COLORS.pink};
  height: 48px;
`;
export const InputFullView = styled.View`
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

export const MessageView = styled.View`
  background: rgba(244, 123, 123, 0.2);
  padding: 3px;
  padding-left: 5px;
  min-width: 100px;
  max-width: 90%;
  min-height: 60px;
  border-color: ${COLORS.pink};
  border-width: 1px;
  border-radius: 12px;
`;

export const UserNameText = styled.Text`
  font-size: 11px;
  opacity: 0.7;
  color: ${COLORS.white};
`;

export const MessageText = styled.Text`
  color: ${COLORS.white};
`;

export const DateText = styled.Text`
  opacity: 0.6;
  font-size: 11px;
  color: ${COLORS.white};
`;

export const SearchCross = styled.Text`
  position: absolute;
  right: 8px;
  top: -5px;
  font-size: 20px;
  color: ${COLORS.lightGray};
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
