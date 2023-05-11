import styled from "styled-components/native";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const HeaderView = styled.View`
  padding-right: 10px;
  padding-left: 10px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row
  flex-wrap: wrap;
  width: 100%;
  height: 50px;
  background-color: #f47b7b;
`;

const HeaderLogo = styled.Text`
  color: white;
  font-size: 25px;
  font-weight: 700;
`;

const HeaderLinks = styled.View`
  flex-wrap: wrap;
`;

const HeaderLink = styled.Text`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5px;
  padding-left: 5px;
  color: white;
  font-size: 20px;
  font-weight: 500;
`;

const HeaderLogout = styled.Image`
  width: 100px;
  height: 100px;
`;

type RootStackParamList = {
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const Header = () => {
  const { navigate } = useNavigation();
  const [auth, setAuth] = useState(false);
  return (
    <HeaderView>
      <HeaderLogo>React Chat</HeaderLogo>
      {auth ? (
        <HeaderLink>Profile</HeaderLink>
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
