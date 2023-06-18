import React, { useEffect } from "react";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {
  BlockView,
  RegisterView,
  SubtitleLinkText,
  SubtitleText,
  SubtitleView,
  SumbitButton,
  TitleText,
} from "./Styles/RegisterStyle";
import Input from "../components/input/Input";
import { useSelector } from "react-redux";
import { selectIsAuth, selectLoginData } from "../redux/Auth/selectors";
import { useAppDispatch } from "../redux/store";
import { Controller, useForm } from "react-hook-form";
import { RegisterParams } from "../redux/Auth/types";
import { fetchRegister } from "../redux/Auth/asyncActions";
import { FlatList } from "react-native";
import Alert from "../components/alert/Alert";
import { setError } from "../redux/Auth/slice";

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterParams>({
    mode: "onChange",
  });
  const { navigate } = useNavigation();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  const { data, statusRegister, error } = useSelector(selectLoginData);

  const onSubmit = async (values: RegisterParams) => {
    await dispatch(fetchRegister(values));
  };

  useEffect(() => {
    dispatch(setError());
  }, []);

  if (isAuth) {
    navigate("Profile", { userName: data.userName });
  }

  return (
    <RegisterView>
      <BlockView>
        <TitleText>Register</TitleText>
        {statusRegister === "error" && error && (
          <FlatList
            data={error}
            renderItem={({ item }) => (
              <Alert typeAlert="error">{item.message}</Alert>
            )}
          />
        )}
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
              placeholder="E-mail"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              secureTextEntry={true}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password confirm"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              secureTextEntry={true}
            />
          )}
          name="passwordConfirm"
        />
        <SumbitButton
          onPress={handleSubmit(onSubmit)}
          title="Register"
          color={COLORS.pink}
          disabled={!isValid}
        />
        <SubtitleView>
          <SubtitleText>
            Log in:{" "}
            <SubtitleLinkText onPress={() => navigate("Login")}>
              Here
            </SubtitleLinkText>
          </SubtitleText>
        </SubtitleView>
      </BlockView>
    </RegisterView>
  );
};

export default RegisterScreen;
