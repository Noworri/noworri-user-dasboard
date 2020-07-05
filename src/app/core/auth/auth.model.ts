import { PaginateData, ResponseData } from "../app/app.model";

export interface DataToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expire_in: number;
  user: User;
}

export interface User {
  id: string;
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
  email_verified_at: Date;
}


export interface VerifyData {
  email: string;
  pathRedirectUrl: string;
}

export interface ResetToken {
  aud: string;
  jti: string;
  iat: number;
  nbf: number;
  exp: number;
  sub: string;
  email: string;
  scopes: any[];
}

export interface ResetData {
  password: string;
  password_confirm: string;
  user: string;
}

export interface DataAuth extends ResponseData {
  data: DataToken;
  message: string;
  success: boolean;
}

export interface PaginateUser extends PaginateData {
  items: User[];
}

export interface DataUsers extends ResponseData {
  data: User[];
}

export interface DataUser extends ResponseData {
  data: User;
}

export interface DataPaginateUsers extends ResponseData {
  data: PaginateUser;
}
