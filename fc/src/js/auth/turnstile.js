window.onloadTurnstileCallback = function () {
	console.log("start token");
	turnstile.render('#turnstile-container', {
		sitekey: '0x4AAAAAAAeZmvjkaX6Vyund',
		callback: function (token) {
			console.log("setToken");
			document.cookie = `cf-turnstile-response=${token}`;
		},
	});
};