import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import logout from "../images/logout.png";
import { Alert, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/Auth/selectors";
import { fetchLogout } from "../redux/Auth/asyncActions";

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
  userName: string;
  chatName?: string;
};

const Header: React.FC<HeaderProps> = ({ userName, chatName }) => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const logoutSite = async () => {
    Alert.alert("Warning", "Do you really want to leave the chat?", [
      {
        text: "NO",
      },
      {
        text: "YES",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await dispatch(fetchLogout({ userName: userName }));
          navigate("Main");
        },
      },
    ]);
  };

  return (
    <HeaderView>
      <TouchableOpacity onPress={() => navigate("Main")}>
        <HeaderLogo>React Chat</HeaderLogo>
      </TouchableOpacity>
      {isAuth ? (
        <HeaderLinks>
          <TouchableOpacity
            onPress={() => navigate("Profile", { userName: userName })}
          >
            <HeaderLink>Profile</HeaderLink>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("Main")}>
            <HeaderLink>{chatName}</HeaderLink>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => logoutSite()}>
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
