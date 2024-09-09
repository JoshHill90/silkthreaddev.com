export async function coockieCheck(cookieName) {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(`${cookieName}=`)) {
			return cookie.split('=')[1];
		}
	}
	return null;
}