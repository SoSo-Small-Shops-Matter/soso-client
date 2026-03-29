export interface GetTokenRequestType {
  code: string | string[];
  redirectUri: string;
}

export interface GetTokenResponseType {
  accessToken: string;
  refreshToken: string;
}
