import { IRole } from '../model/IRole'
import { checkIsAdmin, checkIsManager, checkIsUser } from './checkRole'

export function getHighUserRole(roles: IRole[]) {
  if (checkIsAdmin(roles)) {
    return roles.find(role => role.key === 'admin')!
  }
  if (checkIsManager(roles)) {
    return roles.find(role => role.key === 'manager')!
  }
  if (checkIsUser(roles)) {
    return roles.find(role => role.key === 'user')!
  }
}
