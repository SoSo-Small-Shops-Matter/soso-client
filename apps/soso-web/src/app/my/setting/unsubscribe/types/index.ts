export interface DeleteUserRequest {
  withdrawalReasonCode: WithdrawalReasonCodeType
  withdrawalReasonText?: string
}

export type WithdrawalReasonCodeType = 'not_using' | 'privacy_concern' | 'inconvenient' | 'other_account'
