import { Dispatch, SetStateAction } from 'react'
import { Control, FieldError, FieldErrorsImpl, Merge, UseFormSetValue } from 'react-hook-form'

export interface FileUploaderProps {
  title?: string
  name: string
  control: Control<any>
  setValue: UseFormSetValue<any>
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  acceptFiles?: { [key: string]: string[] }
  acceptFilesText?: string
  maxFiles?: number
  maxFileSize?: number //Размер в мегабайтах
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}
