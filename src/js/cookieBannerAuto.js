

window.addEventListener('load', cookieMessage);
const baseURL = "https://worker.silkthreaddev.com/"

function setCookie(cookieName, cookieValue, expDays) {
	let date = new Date();
	date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000)); // Note: 24 * 60 * 60 * 1000 is one day
	const expires = 'expires=' + date.toUTCString();
	// Set cookie for the root path
	document.cookie = cookieName + '=' + cookieValue + ';' + expires + "; path=/";
	// Set cookie for other paths
	const otherPaths = [
		"/site/contact/contact.html",
		"/site/contact/forms.html",
		"/site/contact/services.html",
		"/site/contact/thanks.html",
		"/about",
		"/site/developer-service/business-application-and-automation.html",
		"/site/developer-service/web-development.html",
		"/site/developer-service/web-hosting.html",
	];

	otherPaths.forEach(path => {
		document.cookie = cookieName + '=' + cookieValue + ';' + expires + "; path=" + path;
	});
}


function getSitCookie(cookieName) {
	const value = document.cookie.split(';');
	for (let i = 0; i < value.length; i++) {
		const cookie = value[i].trim();
		if (cookie.startsWith(cookieName + '=')) {
			return cookie.split('=')[1];
		}
	}
	return null;
}

function cookieMessage() {
	if (!getSitCookie('SilkThreadcookie')) {
		getCookie()
		createCookieBanner();
	}
}

function createCookieBanner() {
	// Create elements

	var cookieDiv = document.createElement("div");
	cookieDiv.className = "cookies";

	var cookieBox = document.createElement("div");
	cookieBox.className = "cookie-box";

	var cookieSubBox = document.createElement("div");
	cookieSubBox.className = "cookie-sub-box";

	var cookiesDiv = document.createElement("div");
	cookiesDiv.id = "cookies";

	var paragraph = document.createElement("p");
	paragraph.className = "p-p";
	paragraph.innerHTML = 'We use cookies on this site to ensure that you have the best possible experience. Rest assured, we do not track your activity across different websites, nor do we sell or store your personal information. To learn more about our policies, please visit our <a href="https://usage.silkthreaddev.com/#cookieP" target="_blank">Usage and Policy Page.</a> <br> Please agree before proceeding';

	var agreeButton = document.createElement("button");
	agreeButton.className = "btn-cookie";
	agreeButton.id = "cookieBtn";
	agreeButton.innerHTML = "Agree";

	// Append elements
	cookiesDiv.appendChild(paragraph);
	cookiesDiv.appendChild(agreeButton);
	cookieSubBox.appendChild(cookiesDiv);
	cookieBox.appendChild(cookieSubBox);
	cookieDiv.appendChild(cookieBox);

	// Append to body
	document.body.appendChild(cookieDiv);
	document.querySelector("#cookieBtn").addEventListener("click", () => {
		document.querySelector("#cookies").style.display = "none";
		setCookie("SilkThreadcookie", true, 30);
	});
}


function getCookie() {
	fetch(`${baseURL}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			const cookie = res.cookie.csrftoken
			setCookie("csrftoken", cookie, 15)
			console.log(cookie)
		})

}

//----------//
//		    //
// include  //
//  in CSS  //
//----------//
//------------------------------------------------------------------------------------------//
//	.cookie-box {
//		padding: 15px 20px;
//		width: 15%;
//		margin: auto;
//	}
//
//	.cookie-sub-box {
//		width: 85%;
//		margin: auto;
//	}
//
//	#cookies{
//		position: fixed;
//		bottom: 0;
//		color: black;
//		background-color: #fff;
//		z-index: 1;
//		padding: 15px 15px;
//	}
//
//	.cookies {
//		min-height: 70px;
//		display: flex;
//		justify-content: space-between;
//		align-items: center;
//	}
//
//
//	.cookies a{
//		color: red;
//	}
//
//
//	@media (max-width:1024px) and (orientation: portrait) {
//
//		.cookie-box {
//			padding: 5px 10px;
//			width: 100%;
//		}
//		.cookie-sub-box {
//			width: 100%;
//
//		}
//	}
//
//	@media (max-width:1024px) and (orientation: landscape) {
//		.cookie-box {
//
//			width: 100%;
//		}
//		.cookie-sub-box {
//			width: 100%;
//
//		}
//	}
//
//	.btn-cookie {
//		background-color: #00000069;
//		margin: 10px;
//		padding: .5rem 1rem;
//		text-align: center;
//		text-transform: uppercase;
//		font-size: var(--p);
//		color: var(--text-color);
//		font-family: var(--font-family-header);
//		letter-spacing: 2px;
//		font-weight: var(--font-weights-norm);
//		background-size: 200% auto;
//		border: 2px solid #00000069;
//		border-radius: 6px;
//	}
//
//	.btn-cookie:hover,
//	.btn-cookie:after {
//		background-color: #000000be;
//		border: 2px solid var(--mc-4);
//	}
//------------------------------------------------------------------------------------------//