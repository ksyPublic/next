import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import cx from 'clsx'

type DropZoneProps = {
  storageKey?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

function DropZone({
  storageKey,
  placeholder,
  className,
  disabled
}: DropZoneProps) {
  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      // 파일을 Cloud Storage에 업로드합니다.
      const storage = getStorage()
      const storageRef = ref(storage, storageKey)
      let fileContent = storageKey
      let blob
      if (fileContent !== undefined) {
        blob = new Blob([fileContent], { type: 'text/plain' })

        const file = acceptedFiles[0] // 단일 파일 업로드만 지원하는 예

        const uploadTask = uploadBytesResumable(storageRef, blob)

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
              console.log('File available at', downloadURL)
            })
          }
        )
      } else {
        return
      }
    },
    [storageKey]
  )

  const classes = cx(
    'ui-dropzone w-full bg-gray-700',
    `${className ? className : ''}`,
    `${disabled ? 'pointer-events-none' : 'pointer-events-auto'}`
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className={classes}>
      <input {...getInputProps()} />
      <p className="text-gray-400 text-sm">{placeholder}</p>
    </div>
  )
}

export default DropZone
