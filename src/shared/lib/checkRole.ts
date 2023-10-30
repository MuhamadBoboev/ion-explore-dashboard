import { IRole } from '../model/IRole'

export function checkRole(roles: IRole[], ...exists: string[]) {
  return roles.some(role => exists.includes(role.key))
}

export function checkIsAdmin(roles: IRole[]) {
  return checkRole(roles, 'admin')
}

export function checkIsManager(roles: IRole[]) {
  return checkRole(roles, 'manager')
}

export function checkIsUser(roles: IRole[]) {
  return checkRole(roles, 'user')
}
