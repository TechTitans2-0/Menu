import {
  SignUpController,
  LoginController,
  LogoutController,
} from '../modules/user/controllers'

export const signUpController = new SignUpController()
export const loginController = new LoginController()
export const logoutController = new LogoutController()
