import { NextRequest, NextResponse } from 'next/server'
import { db, collection, getDocs } from '@/store/user'
import { customInitApp } from '@/store/admin'
import validateSession from '@/utils/session';

customInitApp();
export async function GET(req: NextRequest, res: NextResponse) {
  const decodedClaims = await validateSession(req);
  
  // 유저의 클레임 정보에서 admin 클레임을 확인
  const isAdmin = decodedClaims.admin;

  if (isAdmin) {
    const snapshot = collection(db, 'admin');
    try {
      const menuData = (await getDocs(snapshot)).forEach((item) => item.data());
      return NextResponse.json(menuData, { status: 200 });
    } catch (error) {
      console.error("Error in GET /api/admin:", error);
      return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
