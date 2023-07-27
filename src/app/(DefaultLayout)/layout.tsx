'use client';
import React, { useMemo } from 'react';
import { useAuthUser } from '@/hooks';
import Header from '../header';
import Footer from '../footer';
import cx from 'clsx';

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = useAuthUser();
	const adminUser = useMemo(() => {
		return user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_USER}`;
	}, [user]);

	const classes = cx(adminUser && 'flex w-full');

	if (!user) {
		return;
	}

	return (
		<div className={classes}>
			<div
				className={`flex flex-col w-full ${adminUser ? 'pl-[24.0rem]' : ''}`}
			>
				<Header admin={adminUser} />
				<main className="flex">{children}</main>
				<Footer />
			</div>
		</div>
	);
}
