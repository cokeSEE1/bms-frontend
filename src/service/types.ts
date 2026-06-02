export interface UserRegister {
  username: string
  password: string
}

export interface UserLogin {
  username: string
  password: string
}

export interface UserOut {
  id: number
  username: string
  created_at: string
}

export interface TokenOut {
  access_token: string
  user: UserOut
}

export interface LogoutOut {
  message: string
}

export interface ChangePasswordRequest {
  old_password: string
  new_password: string
}

export interface ChangePasswordOut {
  message: string
}
