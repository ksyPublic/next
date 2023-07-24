'use client'

import React, { useState, useEffect } from 'react'
import {
  Segment,
  ControlLine,
  Text,
  ButtonGroup,
  Button,
  Form,
  Label,
  Input,
  Select,
  Textarea,
  DropZone,
  MessageBox
} from '@/components'
import { useForm, Resolver } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Genre, AgeRating, ContentType } from '@/utils/enum'
import axios from 'axios'

type FormValues = {
  addKey?: string
  titleKR?: string
  titleEN?: string
  contentType?: string
  director?: string
  cast?: string
  genre?: string
  rating?: string
  release?: string
  summary?: string
  trailer?: string
}

const resolver: Resolver<FormValues> = async (values) => {
  let errors = {}
  if (!values.titleKR) {
    errors = {
      ...errors,
      titleKR: {
        type: 'required',
        message: '· 제목입력은 필수입니다.'
      }
    }
  }

  if (!values.titleEN) {
    errors = {
      ...errors,
      titleEN: {
        type: 'required',
        message: '· 영문 제목입력은 필수입니다.'
      }
    }
  }

  if (!values.contentType) {
    errors = {
      ...errors,
      contentType: {
        type: 'required',
        message: '· 컨텐츠 유형 선택은 필수입니다.'
      }
    }
  }

  if (!values.director) {
    errors = {
      ...errors,
      director: {
        type: 'required',
        message: '· 감독입력은 필수입니다.'
      }
    }
  }
  if (!values.cast) {
    errors = {
      ...errors,
      cast: {
        type: 'required',
        message: '· 출연진입력은 필수입니다.'
      }
    }
  }

  if (!values.genre) {
    errors = {
      ...errors,
      genre: {
        type: 'required',
        message: '· 장르 선택은 필수입니다.'
      }
    }
  }

  if (!values.rating) {
    errors = {
      ...errors,
      rating: {
        type: 'required',
        message: '· 시청등급 선택은 필수입니다.'
      }
    }
  }

  if (!values.release) {
    errors = {
      ...errors,
      release: {
        type: 'required',
        message: '· 개봉년도 입력은 필수입니다.'
      }
    }
  }

  if (!values.summary) {
    errors = {
      ...errors,
      summary: {
        type: 'required',
        message: '· 줄거리 입력은 필수입니다.'
      }
    }
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors
  }
}

const AddMoviePage = () => {
  const router = useRouter()
  const [posterKey, setPosterKey] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(true)
  const onTitleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosterKey(event.target.value)

    if (event.target.value.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const addContentUpdate = async (data: any) => {
    console.log(data)
    try {
      const res = await axios.post(
        '/api/admin/management/addcontents',
        {
          addKey: posterKey,
          titleKR: data.titleKR,
          titleEN: data.titleEN,
          director: data.director,
          cast: data.cast,
          genre: data.genre,
          rating: data.rating,
          release: data.release,
          summary: data.summary,
          trailer: data.trailer
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      router.push('/admin/management')
    } catch (error) {
      console.error('등록실패', error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver })

 
  return (
    <Segment className="w-full px-10 mt-4">
      <ControlLine
        content={<Text className="text-xlg text-white" name="컨텐츠 등록" />}
      />
      <Form onSubmit={handleSubmit(addContentUpdate)} id="addcontent">
        <Form.Row>
          <Form.Column>
            <Label name="제목" htmlFor="titleKR" />
            <div className="flex flex-col w-full">
              <Input
                {...register('titleKR')}
                className="w-full"
                id="titleKR"
                placeholder="제목을 입력해주세요."
                onBlur={onTitleBlur}
              />
              {errors?.titleKR && (
                <MessageBox text={errors.titleKR.message} error />
              )}
            </div>
          </Form.Column>
          <Form.Column>
            <Label name="영문제목" htmlFor="titleEN" />
            <div className="flex flex-col w-full">
              <Input
                {...register('titleEN')}
                className="w-full"
                id="titleEN"
                placeholder="영문 제목을 입력해주세요."
              />
              {errors?.titleEN && (
                <MessageBox text={errors.titleEN.message} error />
              )}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="컨텐츠 유형" htmlFor="contentType" />
            <div className="flex flex-col w-full">
              <Select
                {...register('contentType')}
                id="contentType"
                selectOptions={ContentType}
                placeholder="장르를 선택하세요."
              />
              {errors?.contentType && (
                <MessageBox text={errors.contentType.message} error />
              )}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="감독" htmlFor="director" />
            <div className="flex flex-col w-full">
              <Input
                {...register('director')}
                placeholder="감독을 입력해주세요."
                className="w-full"
                id="director"
              />
              {errors?.director && (
                <MessageBox text={errors.director.message} error />
              )}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="출연진" htmlFor="cast" />
            <div className="flex flex-col w-full">
              <Input
                {...register('cast')}
                placeholder="출연진을 입력해주세요."
                className="w-full"
                id="cast"
              />
              {errors?.cast && <MessageBox text={errors.cast.message} error />}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="장르" htmlFor="genre" />
            <div className="flex flex-col w-full">
              <Select
                {...register('genre')}
                id="genre"
                selectOptions={Genre}
                placeholder="장르를 선택하세요."
              />
              {errors?.genre && (
                <MessageBox text={errors.genre.message} error />
              )}
            </div>
          </Form.Column>
          <Form.Column>
            <Label name="시청등급" htmlFor="rating" />
            <div className="flex flex-col w-full">
              <Select
                {...register('rating')}
                id="rating"
                selectOptions={AgeRating}
                placeholder="시청등급을 선택하세요."
              />
              {errors?.rating && (
                <MessageBox text={errors.rating.message} error />
              )}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="개봉년도" htmlFor="release" />
            <div className="flex flex-col w-full">
              <Input
                {...register('release')}
                type="number"
                placeholder="개봉년도를 입력해주세요."
                className="w-full"
                id="release"
                maxLength="4"
              />
              {errors?.release && (
                <MessageBox text={errors.release.message} error />
              )}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="줄거리" htmlFor="summary" />
            <div className="flex flex-col w-full">
              <Textarea
                {...register('summary')}
                placeholder="줄거리를 입력해주세요."
                rows={6}
                id="summary"
              ></Textarea>
              {errors?.summary && (
                <MessageBox text={errors.summary.message} error />
              )}
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="러닝타임" />
            <Text
              as="p"
              className="text-gray-400 h-24 flex items-center"
              name="1:00:00"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="포스터 이미지 URL" htmlFor="poster" />
            <div className="flex flex-col w-full">
              <DropZone
                disabled={disabled}
                placeholder="포스터 이미지를 넣어주세요."
                storageKey={`/images/poster/${posterKey}`}
              />
            </div>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="트레일러" htmlFor="trailer" />
            <Input
              placeholder="트레일러 링크를 입력해주세요."
              className="w-full"
              id="trailer"
            />
          </Form.Column>
        </Form.Row>
      </Form>
      <ButtonGroup align="center" className="mt-10">
        <Button
          size="md"
          variant="secondary"
          onClick={() => router.push('/admin/management')}
        >
          목록가기
        </Button>
        <Button type="submit" size="md" form="addcontent" variant="tertiary">
          등록하기
        </Button>
      </ButtonGroup>
    </Segment>
  )
}

export default AddMoviePage
