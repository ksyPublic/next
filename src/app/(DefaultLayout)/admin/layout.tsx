'use client';
import { useEffect, useState, useMemo, useCallback } from 'react';
import type { MenuItem } from '@/components';
import { get } from '@/utils/api';
import { useAuthUser, useExtractUserDetails } from '@/hooks';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

type AdminLayoutProps = {
	children?: React.ReactNode;
};

const SideBarComponent = dynamic(() =>
	import('@/components').then((mod) => mod.SideBar),
);

export default function AdminLayout({ children }: AdminLayoutProps) {
	const [originUser, setOriginUser] = useState<object | null>();
	const [menuData, setMenuData] = useState<Array<MenuItem>>([]);
	const user = useAuthUser();
	const router = useRouter();
	const adminUser = useMemo(() => {
		return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`;
	}, [user]);

	const getMenu = useCallback(async () => {
		const { token } = await useExtractUserDetails(user);
		const response = await get({
			url: '/api/admin',
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.status === 200) {
			setMenuData(response.data);
		} else {
			router.push('/login');
			throw new Error(response.statusText); // 에러가 발생한 경우 처리
		}
	}, [router, user]);

	useEffect(() => {
		if (adminUser) {
			setOriginUser(user);
			getMenu();
		}
	}, [adminUser, user, getMenu]);

	return (
		<>
			{adminUser && (
				<SideBarComponent defaultOpen user={originUser} data={menuData} />
			)}
			{children}
		</>
	);
}
