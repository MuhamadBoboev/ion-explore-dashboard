// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'
import { checkIsAdmin } from '../../../../shared/lib/checkRole'
import { getHighUserRole } from '../../../../shared/lib/getHighUserRole'
import { ProfileChangeModal } from '@modules/user/ui/ProfileChangeModal'
import { ChangePassword } from '@modules/user/ui/ChangePassword'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const MenuItemStyled = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [isOpenChangeProfile, setIsOpenChangeProfile] = useState(false)
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false)

  // ** Hooks
  const router = useRouter()
  const { logout, user } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleOpenChangeProfile = () => {
    setIsOpenChangeProfile(true)
    handleDropdownClose()
  }

  const handleCloseChangeProfile = () => {
    setIsOpenChangeProfile(false)
  }

  const handleOpenChangePassword = () => {
    setIsOpenChangePassword(true)
    handleDropdownClose()
  }

  const handleCloseChangePassword = () => {
    setIsOpenChangePassword(false)
  }

  const styles = {
    px: 4,
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  const highRole = getHighUserRole(user?.roles || [])

  return (
    <Fragment>
      {isOpenChangeProfile && (
        <ProfileChangeModal
          handleClose={handleCloseChangeProfile}
        />
      )}
      {isOpenChangePassword && (
        <ChangePassword
          handleClose={handleCloseChangePassword}
        />
      )}
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={user?.name || 'Admin'}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src="/images/avatars"
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.5 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={user?.name || 'Admin'}
                src="/images/avatars"
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 2.5, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 500 }}>{user?.name || 'Admin'}</Typography>
              <Typography variant="body2">
                {highRole?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
        {/* <MenuItemStyled sx={{p: 0}} onClick={handleOpenChangeProfile}>
          <Box sx={styles}>
            <Icon icon="iconamoon:profile-fill"/>
            Изменить профиль
          </Box>
        </MenuItemStyled>
        <MenuItemStyled sx={{p: 0}} onClick={handleOpenChangePassword}>
          <Box sx={styles}>
            <Icon icon="ph:password-bold"/>
            Изменить пароль
          </Box>
        </MenuItemStyled>
        <Divider sx={{my: theme => `${theme.spacing(2)} !important`}}/> */}
        <MenuItemStyled onClick={handleLogout} sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem' } }}>
          <Icon icon="tabler:logout" />
          Выход
        </MenuItemStyled>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
