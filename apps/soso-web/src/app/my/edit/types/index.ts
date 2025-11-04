interface RequestType {
  nickName?: string
  profileImgKey?: string //TODO: presignURL로 변경 필요
  file?: File //deprecated
}

export type PatchUserRequestType = RequestType | undefined
