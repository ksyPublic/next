import { NextRequest, NextResponse } from 'next/server'
import { db, collection, doc, getDoc } from '@/store/user'
import { customInitApp } from '@/store/admin'

customInitApp();

export async function GET(req: NextRequest, res: NextResponse) {
    const snapshot = doc(db, 'ADMIN_MENU', 'OBDePfowJNYQV7BnhWJ5eM3fn6G2');
    try {
        const menuData = await getDoc(snapshot)
        return NextResponse.json(menuData.data(), { status: 200 })
    } catch (error) {
        console.error("Error in GET /api/admin:", error);
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 })
    }
}

