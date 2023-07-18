import { NextRequest, NextResponse } from 'next/server'
import { db, collection, getDocs } from '@/store/user'

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const menuCollection = collection(db, 'ADMIN_MENU');
        const snapshot = await getDocs(menuCollection)

        const menuData = snapshot.docs.map((doc: { data: () => any; }) => (doc.data()));

        return NextResponse.json(menuData, { status: 200 })
    } catch (error) {
        console.error("Error in GET /api/admin:", error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 })
    }
}

