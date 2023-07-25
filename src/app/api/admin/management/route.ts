import { NextResponse, NextRequest } from 'next/server'
import { database, ref, get } from '@/store/database';

export async function GET(req: NextRequest, res:NextResponse) {
  const getContentsData = ref(database, 'contents/data');
  let data;
  
  await get(getContentsData).then((snapshot) => {
    if (snapshot.exists()) {
      data = snapshot.val();
    } else {
      console.log("데이터가 없습니다.");
    }
  }).catch((error) => {
    console.error(error);
  });

  return NextResponse.json(data, {status:200});
}