export async function useExtractUserDetails(params: any) {
	if (!params.user) {
		const token = await params.getIdToken();
		const uid = params.uid;
		return { token, uid };
	}

	const token = await params.user.getIdToken();
	const uid = params.user.uid;
	return { token, uid };
}
