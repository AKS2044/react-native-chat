import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../constants/colors";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import {
  BlockView,
  LoginView,
  SubtitleLinkText,
  SubtitleText,
  SubtitleView,
  SumbitButton,
  TitleText,
} from "./Styles/LoginStyle";
import Input from "../components/input/Input";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../redux/Auth/selectors";
import { useAppDispatch } from "../redux/store";
import { fetchLogin } from "../redux/Auth/asyncActions";
import { LoginParams } from "../redux/Auth/types";

const LoginScreen = () => {
  const { navigate } = useNavigation();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const { data, statusLogin, error } = useSelector(selectLoginData);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginParams>({
    mode: "onChange",
  });

  const onSubmit = async (values: LoginParams) => {
    await dispatch(fetchLogin(values));
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("token", String(data.token));
    } catch (e) {
      console.log(e);
    }
  };

  if (data.token) {
    storeData();
  }

  // useEffect(() => {
  //   if (statusLogin === "completed") {
  //     instance.defaults.headers.common["Authorization"] =
  //       window.localStorage.getItem("token");
  //   }
  // }, [statusLogin]);
  if (isAuth) {
    return navigate("Profile");
  }
  return (
    <LoginView>
      <BlockView>
        <TitleText>Log in</TitleText>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Login"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          name="userName"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              secureTextEntry={true}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          name="password"
        />
        <SumbitButton
          onPress={handleSubmit(onSubmit)}
          title="Log in"
          color={COLORS.pink}
          disabled={false}
        />
        <SubtitleView>
          <SubtitleText>
            Registration:{" "}
            <SubtitleLinkText onPress={() => navigate("Register")}>
              Here
            </SubtitleLinkText>
          </SubtitleText>
        </SubtitleView>
      </BlockView>
    </LoginView>
  );
};

export default LoginScreen;
