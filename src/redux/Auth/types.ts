import { Status } from "../../enum/EnumStatus";

export interface LoginState {
  data: LoginPayloadParams;
  error: { message: string }[];
  profile: ProfilePayloadParams;
  serverError: ErrorParams;
  profileStatus: Status;
  urlPhoto: string;
  uploadPhotoStatus: Status;
  statusLogin: Status;
  statusAuth: Status;
  statusRegister: Status;
  statusLogout: Status;
}

export interface LoginParams {
  userName: string;
  password: string;
  rememberMe?: boolean;
}

export interface LogoutParams {
  userName: string;
}

export interface ErrorParams {
  status: number | undefined;
  message: string;
}

export interface ProfilePayloadParams {
  email: string;
  userName: string;
  dateReg: string;
  roles: string[];
  pathPhoto: string;
  photoName: string;
}

export interface RegisterParams {
  email: string;
  userName: string;
  password: string;
  passwordConfirm: string;
  pathPhoto?: string;
  photoName?: string;
}

export interface LoginPayloadParams {
  id: string;
  email: string;
  roles: string[];
  token: boolean;
  userName: string;
  pathPhoto: string;
}

export interface GetProfileParams {
  userName: string;
}
