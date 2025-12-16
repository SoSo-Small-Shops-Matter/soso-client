export interface DeleteUserRequest {
  withdrawalReasonCode: WithdrawalReasonCodeType
}

export type WithdrawalReasonCodeType = 'not_using' | 'privacy_concern' | 'inconvenient' | 'other_account'
