import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";
import { Severity } from "../../enum/EnumSeverity";

const AlertView = styled.View`
  align-items: center
  max-width: 80%;
  min-width: 80%;
  height: 55px;
  margin-bottom: 10px;
  border-radius: 6px;
  border-width: 1px;
`;
const AlertTitleText = styled.Text`
  font-weight: 700;
  font-size: 18px;
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
  return (
    <AlertView
      style={{
        backgroundColor: `${COLORS.typeAlert}`,
        borderColor: "#" + typeAlert + "Border",
      }}
    >
      <AlertTitleText>{typeAlert}</AlertTitleText>
      <AlertSubtitleText>{children}</AlertSubtitleText>
    </AlertView>
  );
};

export default Alert;
