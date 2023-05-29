import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

export const ProfileView = styled.View`
  flex: 1;
  width: 100%;
  background: ${COLORS.primary};
  color: ${COLORS.white};
`;

export const BlockView = styled.View`
  width:100%
  padding: 10px;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ProfileTextView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.pink};
  flex-direction: row;
  height: 30px;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

export const ProfileItemsView = styled.View`
  flex: 1;
  margin-left: 5px;
`;

export const ProfileText = styled.Text`
  color: ${COLORS.white};
`;

export const ButtonsView = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const TitleText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: 700;
`;

export const InputChat = styled.TextInput`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  height: 50px;
  width: 100%;
  border-radius: 8px;
  background: ${COLORS.gray};
  border-width: 1px;
  border-color: ${COLORS.lightGray1};
  color: ${COLORS.white};
`;

export const TitleBlockView = styled.View`
  color: ${COLORS.white};
  background: ${COLORS.pink};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

export const SearchView = styled.View``;

export const SearchCross = styled.Text`
  position: absolute;
  right: 10px;
  font-size: 28px;
  color: ${COLORS.lightGray};
`;

export const SearchInput = styled.TextInput.attrs(() => ({
  placeholderTextColor: COLORS.lightGray,
}))`
  color: ${COLORS.white};
  background: ${COLORS.secondary};
  font-size: 18px;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.pink};
  height: 50px;
`;

export const ChatsView = styled.View`
  flex: 1;
`;

export const PhotoUser = styled.Image`
  border-width: 1px;
  border-color: ${COLORS.pink};
  border-radius: 150px;
  width: 130px;
  height: 130px;
`;
