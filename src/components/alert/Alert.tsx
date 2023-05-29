import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

const AlertView = styled.View`
  align-items: center;
  min-width: 80%;
  height: 50px;
  border-radius: 6px;
  border-width: 1px;
  margin-bottom: 10px;
`;
const AlertTitleText = styled.Text`
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  color: ${COLORS.white};
`;

const AlertSubtitleText = styled.Text`
  color: ${COLORS.white};
`;

type AlertProps = {
  typeAlert?: "warning" | "error" | "info" | "success";
  children: string;
};

const Alert: React.FC<AlertProps> = ({ typeAlert, children }) => {
  const colr = () => {
    if (typeAlert === "warning")
      return { color: COLORS.warning, border: COLORS.warningBorder };

    if (typeAlert === "error")
      return { color: COLORS.error, border: COLORS.errorBorder };

    if (typeAlert === "info")
      return { color: COLORS.info, border: COLORS.infoBorder };

    if (typeAlert === "success")
      return { color: COLORS.success, border: COLORS.successBorder };
  };
  return (
    <AlertView
      style={{
        backgroundColor: colr()?.color,
        borderColor: colr()?.border,
      }}
    >
      <AlertTitleText>{typeAlert}</AlertTitleText>
      <AlertSubtitleText>{children}</AlertSubtitleText>
    </AlertView>
  );
};

export default Alert;
