import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../enum/EnumStatus";
import {
  fetchLogin,
  fetchRegister,
  fetchAuth,
  fetchGetProfile,
  fetchUploadPhoto,
  fetchLogout,
} from "./asyncActions";
import {
  LoginState,
  LoginPayloadParams,
  ProfilePayloadParams,
  ErrorParams,
} from "./types";

const initialState: LoginState = {
  data: {} as LoginPayloadParams,
  error: [],
  profile: {} as ProfilePayloadParams,
  urlPhoto: "",
  uploadPhotoError: {} as ErrorParams,
  serverError: {} as ErrorParams,
  uploadPhotoStatus: Status.EMPTY,
  profileStatus: Status.LOADING,
  statusLogin: Status.LOADING,
  statusAuth: Status.LOADING,
  statusRegister: Status.LOADING,
  statusLogout: Status.LOADING,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setError: (state) => {
      state.statusRegister = Status.LOADING;
      state.statusLogin = Status.LOADING;
      state.error = [];
    },
    setuploadPhotoError: (state) => {
      state.uploadPhotoStatus = Status.EMPTY;
      state.uploadPhotoError = {} as ErrorParams;
    },
  },
  // fetchLogin builder
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.statusLogin = Status.LOADING;
      state.data = {} as LoginPayloadParams;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.statusLogin = Status.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.statusLogin = Status.ERROR;
      state.data = {} as LoginPayloadParams;
      state.error = action.payload ? action.payload : [];
    });

    // fetchRegister builder
    builder.addCase(fetchRegister.pending, (state) => {
      state.statusRegister = Status.LOADING;
      state.data = {} as LoginPayloadParams;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.statusRegister = Status.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.statusRegister = Status.ERROR;
      state.data = {} as LoginPayloadParams;
      state.error = action.payload ? action.payload : [];
    });

    // fetchLogout builder
    builder.addCase(fetchLogout.pending, (state) => {
      state.statusLogout = Status.LOADING;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.statusLogout = Status.SUCCESS;
      state.data = {} as LoginPayloadParams;
    });
    builder.addCase(fetchLogout.rejected, (state) => {
      state.statusLogout = Status.ERROR;
    });

    // fetchAuth builder
    builder.addCase(fetchAuth.pending, (state) => {
      state.statusAuth = Status.LOADING;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.statusAuth = Status.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.statusAuth = Status.ERROR;
    });

    // fetchGetProfile builder
    builder.addCase(fetchGetProfile.pending, (state) => {
      state.profileStatus = Status.LOADING;
    });
    builder.addCase(fetchGetProfile.fulfilled, (state, action) => {
      state.profileStatus = Status.SUCCESS;
      state.profile = action.payload;
    });
    builder.addCase(fetchGetProfile.rejected, (state, action) => {
      state.profileStatus = Status.ERROR;
      state.serverError = action.payload ? action.payload : ({} as ErrorParams);
    });

    // fetchUpload builder
    builder.addCase(fetchUploadPhoto.pending, (state) => {
      state.uploadPhotoStatus = Status.LOADING;
    });
    builder.addCase(fetchUploadPhoto.fulfilled, (state, action) => {
      state.uploadPhotoStatus = Status.SUCCESS;
      state.urlPhoto = action.payload;
    });
    builder.addCase(fetchUploadPhoto.rejected, (state, action) => {
      state.uploadPhotoStatus = Status.ERROR;
      state.uploadPhotoError = action.payload
        ? action.payload
        : ({} as ErrorParams);
    });
  },
});

export const { setError, setuploadPhotoError } = loginSlice.actions;

export default loginSlice.reducer;
