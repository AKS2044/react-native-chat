import { createAsyncThunk } from "@reduxjs/toolkit";
import { pickBy } from "lodash";
import axios, { instance } from "../../axios";
import {
  ErrorParams,
  LoginParams,
  LoginPayloadParams,
  LogoutParams,
  ProfilePayloadParams,
  RegisterParams,
} from "./types";

export const fetchLogin = createAsyncThunk<
  LoginPayloadParams,
  LoginParams,
  { rejectValue: { message: string }[] }
>("login/fetchLoginStatus", async (params, { rejectWithValue }) => {
  const { userName, password, rememberMe } = params;
  try {
    const { data } = await axios.post<LoginPayloadParams>("/User/login", {
      userName,
      password,
      rememberMe,
    });
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchRegister = createAsyncThunk<
  LoginPayloadParams,
  RegisterParams,
  { rejectValue: { message: string }[] }
>("login/fetchRegisterStatus", async (params, { rejectWithValue }) => {
  const { userName, password, passwordConfirm, email } = params;
  try {
    const { data } = await axios.post<LoginPayloadParams>(
      "/User/registration",
      {
        userName,
        password,
        passwordConfirm,
        email,
      }
    );
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const fetchGetProfile = createAsyncThunk<
  ProfilePayloadParams,
  { userName: string },
  { rejectValue: ErrorParams }
>("login/fetchGetProfileStatus", async (params, { rejectWithValue }) => {
  try {
    const { userName } = params;
    const { data } = await axios.get<ProfilePayloadParams>("/User/profile", {
      params: pickBy({
        userName,
      }),
    });
    return data;
  } catch (e: any) {
    const errorResponse: ErrorParams = {
      status: e.response?.status,
      message: e.response?.data.message,
    };
    return rejectWithValue(errorResponse);
  }
});

export const fetchUploadPhoto = createAsyncThunk<
  string,
  { formData: FormData; token: string },
  { rejectValue: ErrorParams }
>("login/fetchUploadPhotoStatus", async (params, { rejectWithValue }) => {
  try {
    const { formData, token } = params;
    const response: any = await fetch(`${instance.getUri()}/User/uploadPhoto`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((json: { message: string }) => {});
    return response;
  } catch (err: any) {
    const errorResponse: ErrorParams = {
      status: err.response?.status,
      message: err.response?.data.message,
    };
    return rejectWithValue(errorResponse);
  }
});

export const fetchLogout = createAsyncThunk<string, LogoutParams>(
  "login/fetchLogoutStatus",
  async (params) => {
    const { data } = await axios.post("/User/logout", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk("login/fetchAuthStatus", async () => {
  const { data } = await axios.get<LoginPayloadParams>("/User/auth");
  return data;
});
