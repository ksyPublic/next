'use client'

import React, { useState } from 'react'
import {
  Grid,
  Segment,
  ControlLine,
  Text,
  ButtonGroup,
  Button,
  NoneData
} from '@/components'
import { useRouter } from 'next/navigation'

const ManagementPage = () => {
  const [movie, setMovie] = useState<Array<null>>([])
  const router = useRouter()
  return (
    <Segment className="w-full px-10 mt-4">
      <ControlLine
        content={<Text className="text-xlg text-white" name="컨텐츠 관리" />}
        controls={
          <ButtonGroup>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => router.push('/admin/management/addcontents')}
            >
              등록
            </Button>
            <Button size="sm" variant="tertiary">
              삭제
            </Button>
          </ButtonGroup>
        }
      />
      <Grid>
        <Grid.Column>
          {movie.length === 0 && (
            <NoneData text="등록된 영화 컨텐츠가 없습니다.<br/> 컨텐츠를 등록해주세요." />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
export default ManagementPage
