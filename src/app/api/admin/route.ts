import { NextRequest, NextResponse } from 'next/server'
import { db, collection, getDocs } from '@/store/user'
import { customInitApp } from '@/store/admin'

export async function GET(req: NextRequest, res: NextResponse) {
    customInitApp();

    try {
        const snapshot = await getDocs(collection(db, 'ADMIN_MENU'));

        const menuData = snapshot.forEach((doc) => {
            console.log('???', doc.data())
        });

        return NextResponse.json(menuData, { status: 200 })
    } catch (error) {
        console.error("Error in GET /api/admin:", error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 })
    }
}

