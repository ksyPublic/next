export function formatBytes(bytes: number, decimals = 2) {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function toPhoneKR(phoneNumber: string) {
	if (!phoneNumber.startsWith('010')) {
		throw new Error(
			'Invalid phone number. Korean phone numbers must start with 010.',
		);
	}

	return '+82' + phoneNumber.substring(1);
}

export async function strWithoutSpaces(str: string) {
	return str.replace(/\s+/g, '').replace(/\./g, '');
}
