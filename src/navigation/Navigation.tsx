import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RootStackParamList } from "./types";
import ChatScreen from "../screens/ChatScreen";
import { COLORS } from "../constants/colors";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { selectLoginData } from "../redux/Auth/selectors";
import { fetchAuth } from "../redux/Auth/asyncActions";
import { useEffect } from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const { statusLogin, statusRegister } = useSelector(selectLoginData);

  useEffect(() => {
    dispatch(fetchAuth());
  }, [statusLogin, statusRegister]);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: COLORS.pink } }}
        initialRouteName="Main"
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: "Main" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: "Chat" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
