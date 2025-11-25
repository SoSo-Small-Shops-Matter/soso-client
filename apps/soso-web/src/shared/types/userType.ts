export interface UserType {
  provider: 'google' | 'apple'
  email: string
  profileImg: string | null
  nickName: string | null // null이면 신규회원
}
