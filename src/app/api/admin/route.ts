import { NextRequest, NextResponse } from 'next/server'
import { db, collection, getDocs } from '@/store/user'
import { customInitApp } from '@/store/admin'
import validateSession from '@/utils/session';

customInitApp();

export async function GET(req: NextRequest, res: NextResponse) {
    const userClaims = validateSession(req);
    const snapshot = collection(db, 'admin')
    try {
        const menuData = (await getDocs(snapshot)).forEach((item) => {
            return item.data()
        })
        return NextResponse.json(menuData, { status: 200 })
    } catch (error) {
        console.error("Error in GET /api/admin:", error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 })
    }
}

