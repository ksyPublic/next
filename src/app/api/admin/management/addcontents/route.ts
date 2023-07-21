
import { NextResponse, NextRequest } from 'next/server'
import { getDatabase, ref, child, push, update} from '@/store/database';

type contentsDataProps = {
  title?:string
  director?:string
  cast?:string
  genre?:string
  rating?:string
  release?:string
  summary?:string
  poster?:string
  trailer ?:string
}

export async function POST(req: NextRequest, res: NextResponse) {
  const db = getDatabase();
  console.log('@@@', req.cookies.getAll())
  // const {title, director, cast, genre, rating, release, summary, poster, trailer, key } = req.body;

  // const contentsData = {title, director, cast, genre, rating, release, summary, poster, trailer, key};

  // // Get a key for a new Post.
  // const newPostRef = push(child(ref(db), key));
  // const newPostKey = newPostRef.key;

  // // If key generation was successful, update the database.
  // if (newPostKey) {
  // const updates: Record<string, contentsDataProps> = {};
  //   updates['/contents/' + newPostKey] = contentsData;
    
  //   // Perform the updates.
  //   await update(ref(db), updates);
    
  //   NextResponse.json({ message: 'Success' }, {status:200});
  // } else {
  //   NextResponse.json({ message: 'Error generating unique key' }, {status:500});
  // }
}