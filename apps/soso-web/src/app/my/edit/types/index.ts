interface RequestType {
  nickName?: string
  profileImage?: File
}

export type PatchUserRequestType = RequestType | undefined
