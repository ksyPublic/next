const validateEmail = (email: string) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phoneNumber: string) => {
	// 이 정규식은 하이픈이 없는 11자리의 한국 휴대폰 번호 형식을 체크합니다.
	const re = /^01[016789][0-9]{8}$/;
	return re.test(String(phoneNumber));
};

function validatePassword(password: string) {
	const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~!@#$%^&*]).{8,15}$/;
	return re.test(String(password));
}

export { validateEmail, validatePhoneNumber, validatePassword };
