import React from 'react'
import { DataTable } from '@/components'
import { MovieListProps, MovieValue } from './types'
import Link from 'next/link'

const MovieList = ({ data }: MovieListProps) => {
  return (
    <DataTable.Wrapper caption="등록된 컨텐츠 목록">
      <colgroup>
        <col width="60rem" />
        <col width="auto" />
        <col width="120rem" />
        <col width="120rem" />
        <col width="120rem" />
      </colgroup>
      <DataTable.Head>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>관람연령</th>
          <th>개봉년월일</th>
          <th>등록날짜</th>
        </tr>
      </DataTable.Head>
      <DataTable.Body>
        <>
          {data &&
            Object.entries(data).map(
              ([key, value]: [string, MovieValue], i: number) => {
                if (!value) return
                return (
                  <tr key={key}>
                    <td>{i + 1}</td>
                    <td className="!text-left">
                      <Link
                        href={`/admin/management/${key}`}
                        className="hover:underline"
                      >
                        <span className="block">{value.titleKR}</span>
                        <span className="block lato text-sm mt-2">
                          {value.titleEN}
                        </span>
                      </Link>
                    </td>
                    <td>{value.rating}</td>
                    <td>{value.release}</td>
                    <td>{value.addDate}</td>
                  </tr>
                )
              }
            )}
        </>
      </DataTable.Body>
    </DataTable.Wrapper>
  )
}

export default MovieList
