'use client'

import React, { useState } from 'react'
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
  DropZone
} from '@/components'
import { useRouter } from 'next/navigation'
import { Genre, AgeRating } from '@/utils/enum'

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

  const [formState, setFormState] = useState({
    title: '',
    director: '',
    cast: '',
    genre: '',
    rating: '',
    release: '',
    summary: '',
    poster: '',
    trailer: ''
  })

  const addContentUpdate = async () => {
    const res = await fetch('/api/admin/management/addcontents', {
      method: 'POST',
      body: JSON.stringify({
        key: formState.title,
        title: formState.title,
        director: formState.director,
        cast: formState.cast,
        genre: formState.genre,
        rating: formState.rating,
        release: formState.release,
        summary: formState.summary,
        poster: formState.poster,
        trailer: formState.trailer
      })
    })

    console.log('@@@', res)
  }

  return (
    <Segment className="w-full px-10 mt-4">
      <ControlLine
        content={<Text className="text-xlg text-white" name="컨텐츠 등록" />}
      />
      <Form>
        <Form.Row>
          <Form.Column>
            <Label name="제목" htmlFor="title" />
            <Input
              placeholder="제목을 입력해주세요."
              className="w-full"
              id="title"
              value={formState.title}
              onBlur={onTitleBlur}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="감독" htmlFor="director" />
            <Input
              placeholder="감독을 입력해주세요."
              className="w-full"
              id="director"
              value={formState.director}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="출연진" htmlFor="cast" />
            <Input
              placeholder="출연진을 입력해주세요."
              className="w-full"
              id="cast"
              value={formState.cast}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="장르" htmlFor="genre" />
            <Select
              id="genre"
              selectOptions={Genre}
              placeholder="장르를 선택하세요."
              value={formState.genre}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            />
          </Form.Column>
          <Form.Column>
            <Label name="시청등급" htmlFor="rating" />
            <Select
              id="rating"
              selectOptions={AgeRating}
              placeholder="시청등급을 선택하세요."
              value={formState.rating}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="개봉년도" htmlFor="release" />
            <Input
              placeholder="개봉년도를 입력해주세요."
              className="w-full"
              id="release"
              value={formState.release}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="줄거리" htmlFor="summary" />
            <Textarea
              placeholder="줄거리를 입력해주세요."
              rows={6}
              id="summary"
              value={formState.summary}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
            ></Textarea>
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
            <DropZone
              disabled={disabled}
              placeholder="포스터 이미지를 넣어주세요."
              storageKey={`/images/poster/${posterKey}`}
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="트레일러" htmlFor="trailer" />
            <Input
              placeholder="트레일러 링크를 입력해주세요."
              className="w-full"
              id="trailer"
              value={formState.trailer}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFormState({
                  ...formState,
                  [event.target.id]: event.target.value
                })
              }
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
        <Button size="md" variant="tertiary" onClick={addContentUpdate}>
          등록하기
        </Button>
      </ButtonGroup>
    </Segment>
  )
}

export default AddMoviePage
