import styled from "styled-components/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import logout from "../images/logout.png";
import { TouchableOpacity } from "react-native";

const HeaderView = styled.View`
  padding-right: 10px;
  padding-left: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: ${COLORS.pink};
`;

const HeaderLogo = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 700;
`;

const HeaderLinks = styled.View`
  flex-wrap: wrap;
  justify-content: center;
`;

const HeaderImage = styled.Image`
  width: 25px;
  height: 25px;
`;

const HeaderLink = styled.Text`
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5px;
  padding-left: 3px;
  color: white;
  width: 100px;
  font-size: 20px;
  font-weight: 500;
`;

type HeaderProps = {
  userName?: string;
  chatName?: string;
};

const Header: React.FC<HeaderProps> = ({ userName, chatName }) => {
  const { navigate } = useNavigation();
  const [auth, setAuth] = useState(true);
  return (
    <HeaderView>
      <HeaderLogo>React Chat</HeaderLogo>
      {auth ? (
        <HeaderLinks>
          <TouchableOpacity onPress={() => navigate("Profile")}>
            <HeaderLink>Profile</HeaderLink>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Main")}>
            <HeaderLink>{chatName}</HeaderLink>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Profile")}>
            <HeaderImage source={logout} />
          </TouchableOpacity>
        </HeaderLinks>
      ) : (
        <HeaderLinks>
          <HeaderLink onPress={() => navigate("Login")}>Login</HeaderLink>
          <HeaderLink onPress={() => navigate("Register")}>Register</HeaderLink>
        </HeaderLinks>
      )}
    </HeaderView>
  );
};

export default Header;
