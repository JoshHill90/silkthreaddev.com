export default function defaultGetCookie() {
	const value = document.cookie.split(';');
	for (let i = 0; i < value.length; i++) {
		const cookie = value[i].trim();
		if (cookie.startsWith("silkthread_GFTL" + '=')) {
			return cookie.split('=')[1];
		}
	}
	return null
}
