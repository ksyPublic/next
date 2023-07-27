import { NextResponse, NextRequest } from 'next/server';
import { collection, getDocs, getFirestore } from '@/store/client';

const db = getFirestore();
export async function GET(req: NextRequest, res: NextResponse) {
	try {
		const querySnapshot = await getDocs(collection(db, 'contents/data'));
		const contentsData: any[] = [];
		querySnapshot.forEach((doc) => {
			contentsData.push(doc.data());
		});
		return NextResponse.json(contentsData, { status: 200 });
	} catch (error) {
		console.error('Error in GET /api/admin/management:', error);
		return NextResponse.json(
			{ message: 'Error fetching data' },
			{ status: 500 },
		);
	}
}
