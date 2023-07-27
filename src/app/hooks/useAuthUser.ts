import { useContext } from 'react';
import { AuthContext } from '@/store/client/authContext'; // AuthContext의 실제 경로로 변경해주세요.

export function useAuthUser() {
	const auth = useContext(AuthContext);
	const user = auth?.user;

	if (!user) {
		return;
	}
	return user;
}
