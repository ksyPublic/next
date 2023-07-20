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
  Textarea
} from '@/components'
import { useRouter } from 'next/navigation'

const AddMoviePage = () => {
  const router = useRouter()

  return (
    <Segment className="w-full px-10 mt-4">
      <ControlLine
        content={<Text className="text-xlg text-white" name="영화등록" />}
      />
      <Form>
        <Form.Row>
          <Form.Column>
            <Label name="제목" htmlFor="title" />
            <Input
              placeholder="제목을 입력해주세요."
              className="w-full"
              id="title"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="감독" htmlFor="title" />
            <Input
              placeholder="감독을 입력해주세요."
              className="w-full"
              id="title"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="출연진" htmlFor="title" />
            <Input
              placeholder="출연진을 입력해주세요."
              className="w-full"
              id="title"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="장르" htmlFor="title" />
            <Select>
              <Select.Option value="">코미디</Select.Option>
            </Select>
          </Form.Column>
          <Form.Column>
            <Label name="시청등급" htmlFor="title" />
            <Select>
              <Select.Option value="19세">19세</Select.Option>
            </Select>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="개봉년도" htmlFor="title" />
            <Input
              placeholder="개봉년도를 입력해주세요."
              className="w-full"
              id="title"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="줄거리" htmlFor="title" />
            <Textarea placeholder="줄거리를 입력해주세요." rows={6}></Textarea>
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="러닝타임" htmlFor="title" />
            <Text
              as="p"
              className="text-gray-400 h-24 flex items-center"
              name="1:00:00"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="포스터 이미지 URL" htmlFor="title" />
            <Input
              placeholder="포스터 이미지 URL을 입력해주세요."
              className="w-full"
              id="title"
            />
          </Form.Column>
        </Form.Row>
        <Form.Row>
          <Form.Column>
            <Label name="트레일러" htmlFor="title" />
            <Input
              placeholder="트레일러 링크를 입력해주세요."
              className="w-full"
              id="title"
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
        <Button size="md" variant="tertiary">
          등록하기
        </Button>
      </ButtonGroup>
    </Segment>
  )
}

export default AddMoviePage
