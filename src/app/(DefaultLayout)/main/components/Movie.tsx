import Image from 'next/image'

export type MovieProps = {
  [x: string]: string
  coverImg: string
  description: string
  genres: any
  key: string
  summary: string
  title: string
  // 영화 데이터에 맞는 필드를 추가하세요.
}
const Movie = ({
  key,
  coverImg,
  description,
  title,
  summary,
  genres
}: MovieProps) => {
  return (
    <div key={key} className="w-custom inline-block align-top mr-10 mb-10">
      <Image
        src={coverImg}
        width="230"
        height="360"
        alt={description}
        layout="responsive"
      />
      <h2 className="text-white text-lg lato font-bold mt-4 mb-2">{title}</h2>
      <p className="text-gray-400 text-sm lato line-clamp-5">{summary}</p>
      <ul>
        {genres.map((g: string, idx: number) => (
          <li
            className="inline-block ml-2 first:ml-0 text-gray-600 text-tiny"
            key={idx}
          >
            {`#${g}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Movie
