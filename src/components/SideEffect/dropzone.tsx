import React, { useCallback, useState, useRef } from 'react'
import { IconButton } from '@/components'
import { formatBytes } from '@/utils/format'
import { useDropzone } from 'react-dropzone'
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef'
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic'
import getElementType from '../utils/getElementType'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import cx from 'clsx'

type DropZoneProps = {
  storageKey?: string
  placeholder?: string
  className?: string
}

const DropZone = React.forwardRef(
  ({ storageKey, placeholder, className, ...props }, forwardedRef) => {
    const [fileInfo, setFileInfo] = useState<{
      name: string
      size: number
      type: string
    } | null>() // 상태 추가
    const [downloadUrl, setDownloadUrl] = useState<string>('') // 상태 추가
    const onDrop = useCallback(
      async (acceptedFiles: any) => {
        // 파일을 Cloud Storage에 업로드합니다.
        const storage = getStorage()
        const storageRef = ref(
          storage,
          `${storageKey}/${acceptedFiles[0].name}`
        )
        const file = acceptedFiles[0] // 단일 파일 업로드만 지원하는 예

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          (error) => {
            console.error('Upload failed:', error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setDownloadUrl(downloadURL) // 상태 업데이트
            })
          }
        )

        setFileInfo({
          name: file.name,
          type: file.type,
          size: file.size
        }) // 상태 업데이트
      },
      [storageKey]
    )

    const deleteFile = async () => {
      // Firebase Storage에서 파일을 삭제합니다.
      const storage = getStorage()
      const fileRef = ref(storage, `${storageKey}/${fileInfo?.name}`)

      deleteObject(fileRef)
        .then(() => {
          console.log('File deleted successfully')
          setFileInfo(null) // 상태 초기화
          setDownloadUrl('') // 상태 초기화
        })
        .catch((error) => {
          console.error('Failed to delete file:', error)
        })
    }

    const classes = cx(
      'ui-dropzone w-full bg-gray-700',
      `${className ? className : ''}`
    )
    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const ElementType = getElementType(DropZone, props)
    const dropzoneRef = useRef<HTMLInputElement>(null)
    useRefObjectAsForwardedRef(forwardedRef, dropzoneRef)
    return (
      <ElementType {...getRootProps()} className={classes}>
        <input {...getInputProps()} {...props} ref={dropzoneRef} />
        {fileInfo ? (
          <div className="flex items-center">
            <p className="text-sm text-white">
              {fileInfo.name}[{formatBytes(fileInfo.size)}]
            </p>
            <IconButton
              icon="delete"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation()
                deleteFile()
              }}
              className="ml-4 relative z-10"
            />
          </div>
        ) : (
          <p className="text-gray-400 text-sm">{placeholder}</p>
        )}
      </ElementType>
    )
  }
) as PolymorphicForwardRefComponent<'input', DropZoneProps>

DropZone.displayName = 'Input'

export { DropZone }
