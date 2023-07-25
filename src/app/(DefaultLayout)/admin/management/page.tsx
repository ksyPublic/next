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
import { MovieValue } from './components/types'

const ManagementPage = () => {
  const [movie, setMovie] = useState<MovieValue[]>([])
  const router = useRouter()
  const getMovieData = async () => {
    try {
      const response = await axios.get('/api/admin/management')
      if (response.status === 200) {
        console.log('success:데이터호출완료', response)
        setMovie(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovieData()
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
          {movie.length === 0 ? (
            <NoneData text="등록된 영화 컨텐츠가 없습니다.<br/> 컨텐츠를 등록해주세요." />
          ) : (
            <MovieList data={movie} />
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
export default ManagementPage
