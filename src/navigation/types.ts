import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Profile: { userName: string };
  Chat: { chatId: number };
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;
