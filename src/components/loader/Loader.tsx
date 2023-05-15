import React from "react";
import styled from "styled-components/native";
import { COLORS } from "../../constants/colors";

const LoaderView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${COLORS.primary};
`;

const LoaderText = styled.Text`
  font-size: 28px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 25px;
  padding-right: 25px;
  background: ${COLORS.white};
  color: ${COLORS.primary};
`;

const Loader = () => {
  return (
    <LoaderView>
      <LoaderText>Loading....</LoaderText>
    </LoaderView>
  );
};

export default Loader;
