import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

export const RegisterView = styled.View`
  flex: 1;
  background: ${COLORS.primary};
`;

export const BlockView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TitleText = styled.Text`
  color: ${COLORS.white};
  margin-bottom: 25px;
  font-size: 30px;
  font-weight: 700;
`;

export const SumbitButton = styled.Button`
  background: ${COLORS.secondary};
`;

export const SubtitleView = styled.View`
  flex-wrap: wrap;
`;

export const SubtitleText = styled.Text`
  margin-top: 20px;
  font-weight: 300;
  color: ${COLORS.white};
`;

export const SubtitleLinkText = styled.Text`
  color: ${COLORS.pink};
  text-decoration: underline;
`;
