export interface UserInfo {
  id: number
  username: string
  phone: string
  email?: string
  avatar?: string
  roles?: string[]
  permissions?: string[]
}

export interface AuthState {
  token: string | null
  userInfo: UserInfo | null
}

export interface UserState {
  token: string | null
  userInfo: UserInfo | null
} 