import { NextResponse, NextRequest } from 'next/server';
import { getFirestore, doc, setDoc } from '@/store/client';
import { customInitApp } from '@/store/admin';
import validateSession from '@/utils/session';

type ContentsDataProps = {
	addKey?: string;
	contentType?: string;
	titleKR?: string;
	titleEN?: string;
	director?: string;
	cast?: string;
	genre?: string;
	rating?: string;
	release?: string;
	summary?: string;
	trailer?: string;
};

customInitApp();
const db = getFirestore();
export async function POST(req: NextRequest) {
	const decodedClaims = await validateSession(req);

	// 유저의 클레임 정보에서 admin 클레임을 확인
	const isAdmin = decodedClaims?.admin;

	if (isAdmin) {
		const formData = JSON.parse(await req.text());
		const { addKey } = formData as ContentsDataProps;
		const getKey = addKey?.replace(/\s+/g, '').replace(/\./g, '');

		// 현재 날짜를 얻어서 YYYY-MM-DD 형식의 문자열로 변환
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 월에 1을 더하고, 결과가 한 자리수이면 앞에 '0'을 붙입니다.
		const day = String(date.getDate()).padStart(2, '0'); // 일이 한 자리수이면 앞에 '0'을 붙입니다.

		const formattedDate = `${year}-${month}-${day}`;
		try {
			await setDoc(doc(db, 'contents', 'data', `${getKey}`), {
				...formData,
				formattedDate,
			});

			return NextResponse.json({ message: 'success' }, { status: 200 });
		} catch (error) {
			return NextResponse.json({ message: 'fail' }, { status: 405 });
		}
	} else {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
}
