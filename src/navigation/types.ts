import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
  Chat: { chatName: string };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
