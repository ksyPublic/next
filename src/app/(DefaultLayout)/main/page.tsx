'use client'

import { useState, useEffect, Suspense } from 'react'
import { MovieProps } from './components/Movie'
import dynamic from 'next/dynamic'
import Loading from './loading'

const Movie = dynamic(() => import('./components/Movie'))

const MainPage = () => {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json()
    setMovies(json.data.movies)
  }

  useEffect(() => {
    getMovies()
  }, [])

  console.log('???', movies)
  return (
    <Suspense fallback={<Loading />}>
      <div className="px-10 mt-20 -mr-[2.5rem]">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            coverImg={movie.large_cover_image}
            description={movie.description_full}
            title={movie.title}
            genres={movie.genres}
            summary={movie.summary}
          />
        ))}
      </div>
    </Suspense>
  )
}

export default MainPage
