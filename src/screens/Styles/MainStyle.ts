import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

export const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${COLORS.primary};
  color: ${COLORS.white};
`;

export const BlockView = styled.View`
  justify-content: space-evenly;
  padding-top: 25px;
  width: 80%;
  align-items: center;
  flex-direction: row;
`;

export const WelcomeText = styled.Text`
  text-align: center;
  font-weight: 700;
  color: ${COLORS.white};
  width: 80%;
  font-size: 30px;
`;

export const SumbitPressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${COLORS.gray};
  border-radius: 4px;
  width: 49%;
  height: 40px;
  background: ${COLORS.secondary};
`;

export const SumbitText = styled.Text`
  font-size: 18px;
  color: ${COLORS.white};
`;
