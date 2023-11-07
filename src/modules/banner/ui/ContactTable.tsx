import { KeyedMutator } from "swr"
import { IBanner } from "../model/IBanner"
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField } from "@mui/material"
import useSWRMutation from "swr/mutation"
import { deleteFetcher } from "@shared/api/fetcher/deleteFetcher"
import { useEffect, useState } from "react"
import { axiosInstance } from "@shared/api/axiosInstance"
import { postFetcher } from "@shared/api/fetcher/postFetcher"
import toast from "react-hot-toast"
import { postFetcherJson } from "@shared/api/fetcher/postFetcherJson"
import { updateFetcherJson } from "@shared/api/fetcher/updateFetcherJson"
import { useLanguageStore } from "@shared/model/store"

interface Props {
  contact: IBanner
  loading: boolean
  mutate: KeyedMutator<any>
}

function ContactTable({ contact, loading, mutate }: Props) {
  const { trigger, isMutating } = useSWRMutation(['/contact', 1], updateFetcherJson)
  const [stateData, setStateData] = useState<IBanner>(contact)
  const { langList } = useLanguageStore(({ langList }) => ({ langList }))
  useEffect(() => {
    setStateData(contact)
  }, [contact])

  if (!stateData || isMutating || loading) {
    return (<h1>Loading ...</h1>)
  }

  const onSubmit = async () => {
    try {
      const { id, ...data } = stateData
      const response = await trigger({
        ...data,
        lang_id: langList.find(({ code }) => code === data.lang_id)?.id || 1
      })

      toast.success('Успешно изменено')
      await mutate()
    } catch (e) {
      toast.error('Произошла ошибка')
    }
  }


  const { id, ...newData } = stateData
  const onChange = (name: keyof IBanner) => (event: any) => {
    const target = event.target as HTMLInputElement
    setStateData({
      ...stateData,
      [name]: target.value
    })
  }

  return (
    <>
      <div>
        <FormControl sx={{
          display: 'flex',
          gridGap: '16px',
          padding: '10px'
        }}>
          {Object.keys(newData).map((el) => (
            <TextField
              required
              id={`${el}`}
              label={`${el}`}
              key={el}
              onChange={onChange(el as keyof IBanner)}
              value={stateData[el as keyof IBanner]}
            />
          ))}
          <Grid sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            {/* <Button >Изменить</Button> */}
            <Button onClick={onSubmit}>Отправить</Button>
          </Grid>
        </FormControl>
      </div>
    </>
  )
}



export { ContactTable }
