export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IDecodedUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export enum userRole {
  admin = "admin",
  super_admin = "super_admin",
  user = "user",
}
