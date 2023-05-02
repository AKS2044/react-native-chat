import styled from "styled-components/native";
import logout from "../images/logout.svg";

const HeaderView = styled.View`
  padding-right: 10px;
  padding-left: 10px;
  justify-content: center;
  width: 100%;
  height: 60px;
  background-color: #f47b7b;
`;

const HeaderLogo = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 700;
`;

const HeaderLogout = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Header = () => {
  return (
    <HeaderView>
      <HeaderLogo>React Chat</HeaderLogo>
    </HeaderView>
  );
};
