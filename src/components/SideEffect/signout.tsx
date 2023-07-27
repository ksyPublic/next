import { IconButton, IconButtonProps } from '@/components';
import { signOut, getAuth } from '@/store/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const auth = getAuth();
const SignOut = ({ className, size, name, variant }: IconButtonProps) => {
	const router = useRouter();

	const logoutHandler = async () => {
		await signOut(auth);

		try {
			const response = await axios.post(
				process.env.NODE_ENV === 'development'
					? `http://${process.env.NEXT_PUBLIC_DEV_HOST}/api/main`
					: `${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
			);

			if (response.status === 200) {
				router.push('/login');
			}
		} catch (error) {
			console.error('Logout failed', error);
		}
	};
	return (
		<IconButton
			name={name}
			size={size}
			variant={variant}
			onClick={logoutHandler}
			className={className}
		/>
	);
};

export default SignOut;
