'use client'

import React, { useState, useEffect } from 'react'
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
import axios from 'axios'
import MovieList from './components/MovieList'
import { MovieListProps } from './components/types'
import { onValue, ref, database } from '@/store/database'

const ManagementPage = () => {
  const [movie, setMovie] = useState<MovieListProps>({ list: [] })
  const router = useRouter()

  useEffect(() => {
    const dbRef = ref(database, 'contents/data')
    const listener = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          console.log('!!!', snapshot)
          setMovie({ list: snapshot.val() })
        } else {
          console.log('데이터가 없습니다.')
        }
      },
      (error) => {
        console.error(error)
      }
    )

    return () => {
      listener()
    }
  }, [])
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
          {movie.list.length === 0 ? (
            <NoneData text="등록된 영화 컨텐츠가 없습니다.<br/> 컨텐츠를 등록해주세요." />
          ) : (
            <MovieList list={movie.list} />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
export default ManagementPage
