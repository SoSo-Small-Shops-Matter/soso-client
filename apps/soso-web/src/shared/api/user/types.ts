export interface UserType {
  provider: 'google' | 'apple';
  email: string;
  profileImg: string | null;
  nickName: string | null; // null이면 신규회원
}

interface PatchUserRequestBase {
  nickName?: string;
  profileImage?: File;
}

export type PatchUserRequestType = PatchUserRequestBase | undefined;

export interface DeleteUserRequest {
  withdrawalReasonCode: WithdrawalReasonCodeType;
}

export type WithdrawalReasonCodeType =
  | 'not_using'
  | 'privacy_concern'
  | 'inconvenient'
  | 'other_account';
