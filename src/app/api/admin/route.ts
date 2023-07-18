import { NextRequest, NextResponse } from 'next/server'
import { db, collection, getDocs } from '@/store/user'

export async function GET(req: NextRequest, res: NextResponse) {
    const menuCollection = collection(db, 'ADMIN_MENU');
    const snapshot = await getDocs(menuCollection)

    const menuData = snapshot.docs.map((doc: { data: () => any; }) => (doc.data()));

    console.log(menuData)

    return NextResponse.json({}, { status: 200 })
}

