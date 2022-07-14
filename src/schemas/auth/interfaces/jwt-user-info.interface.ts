import { RoleEnum } from '../enums/role.enum';

export interface IJwtUserInfo {
  userId: string
  userRole: RoleEnum
  iat: number
  exp: number
}