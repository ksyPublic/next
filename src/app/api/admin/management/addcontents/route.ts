import { NextResponse, NextRequest } from 'next/server'
import { database, ref, child, push, update } from '@/store/database';

type ContentsDataProps = {
  addKey?: string,
  contentType?:string,
  titleKR?:string,
  titleEN?:string,
  director?: string,
  cast?: string,
  genre?: string,
  rating?: string,
  release?: string,
  summary?: string,
  trailer?: string,
}

export async function POST(req: NextRequest) {
  const formData = JSON.parse(await req.text());

  const { contentType, titleKR, titleEN, director, cast, genre, rating, release, summary, trailer, addKey } = formData as ContentsDataProps;

  const getKey = addKey?.replace(/\s+/g, '').replace(/\./g, '')
  const newPostRef = push(child(ref(database), 'contents'));
  const newPostKey = newPostRef.key;
  // 현재 날짜를 얻어서 YYYY-MM-DD 형식의 문자열로 변환
  const date = new Date();
  const addDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  if (newPostKey) {
    const updates: Record<string, ContentsDataProps> = {};
    updates['/contents/' + 'data' + `/${getKey}`] = {
      ...formData,
      addDate
    };
    
    await update(ref(database), updates);
    return NextResponse.json({ message: 'Success' }, {status:200});
  } else {
    return NextResponse.json({ message: 'Error generating unique key' }, {status:500});
  }
}
