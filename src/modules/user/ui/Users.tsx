import useSWR from 'swr'
import Error500 from '../../../pages/500'
import CustomCard from '@shared/ui/CustomCard'
// import { BannerModals } from '@modules/banner/ui/BannerModals'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { IUserData } from '@modules/user/model/IUser'
import { UsersTable } from '@modules/user/ui/UsersTable'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { LoadingButton } from '@mui/lab'
import { Icon } from '@iconify/react'

function Users() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [search, setSearch] = useState('')
  const [inputValue, setInputValue] = useState('')
  const {
    data: users,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IUserData>(`/users?page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}&${search ? `search=${search}` : ''}`, getFetcher, {
    keepPreviousData: true,
  })

  useEffect(() => {
    if (users) {
      if (paginationModel.page > 0) {
        if (users.meta.total === 0) {
          setPaginationModel({
            ...paginationModel,
            page: paginationModel.page - 1,
          })
        }
      }
    }
  }, [paginationModel, users])

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      {/* <BannerModals mutate={mutate} /> */}
      <Box
        mb={5}
        display="flex"
        alignItems="center"
      >
        <CardHeader title="Пользователи" />
        <Box ml="auto" mr={5}>
          <TextField
            size="small"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
            onKeyUp={(event) => {
              if (event.code === 'Enter') {
                setSearch(inputValue)
                setPaginationModel({
                  ...paginationModel,
                  page: 0
                })
              }
            }}
            sx={{ mr: 2 }}
          />
          <LoadingButton
            loading={isValidating}
            type="button"
            size="large"
            variant="contained"
            sx={{ minWidth: 'auto', px: 4, py: 3 }}
            onClick={() => {
              setSearch(inputValue)
              setPaginationModel({
                ...paginationModel,
                page: 0
              })
            }}
          >
            <Icon icon="carbon:search" />
          </LoadingButton>
        </Box>
      </Box>
      <UsersTable
        loading={isLoading || isValidating}
        users={users}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        mutate={mutate}
      />
    </CustomCard>
  )
}

export { Users }
