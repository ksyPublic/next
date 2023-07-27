'use client';
import React, { useContext } from 'react';
import { Input, SignOut } from '@/components';
import { AuthContext } from '@/store/client/authContext';
import Image from 'next/image';
import Link from 'next/link';

type HeaderProps = {
	admin?: boolean;
};

export default function Header({ admin }: HeaderProps) {
	const auth = useContext(AuthContext);
	const user = auth?.user;

	return (
		<header className="flex">
			<div className="h-32 px-10 w-full flex items-center justify-between">
				{!admin && (
					<h1>
						<Link
							href={'/'}
							className="relative z-10 text-white font-bold text-extra tracking-tighter shadow-lg shadow-black lato"
						>
							NEXTLIFE
						</Link>
					</h1>
				)}

				{user ? (
					<>
						<div className={`w-[48.0rem] ${admin && 'ml-auto'}`}>
							<Input placeholder="검색" size="sm" />
						</div>
						{!admin && (
							<ul className={`flex items-center ${admin ? 'ml-auto' : ''}`}>
								<li>
									<Link href="/profile">
										<Image
											className="rounded-full"
											alt="user profile"
											width={40}
											height={40}
											src={`${
												user?.photoURL || `/images/icon/icon-account.svg`
											}`}
										/>
									</Link>
								</li>
								<li className="mr-4 ml-2 font-medium text-white">
									{user?.displayName
										? `환영합니다 ${user?.displayName} 님`
										: `환영합니다`}
								</li>
								<li className="last:mr-0">
									<SignOut name="로그아웃" size="sm" />
								</li>
							</ul>
						)}
					</>
				) : (
					<ul className="flex items-center">
						<li>
							<Link href="/login">로그인</Link>
						</li>
					</ul>
				)}
			</div>
		</header>
	);
}
