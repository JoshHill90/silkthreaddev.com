export async function coockieCheck() {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith('silkthread_GFTL=')) {
			return cookie.split('=')[1];
		}
	}
	return null;
}