
export class AuthForms {
	constructor(Auth, UserAuth, Loader) {
		this.auth = Auth
		this.userAuth = UserAuth
		this.loader = Loader
	}

	async init() {
		// login use
		console.log("Login Button")
		await this.getURLParams()
		this.loginListiner()
		this.loader.hideLoader()
	}

	async getURLParams() {
		let urlParams = window.location.search;
		this.auth.returnToPage = urlParams.split('lookingFor=')[1];
	}

	getLoginInputs() {
		this.auth.userInput = document.getElementById("userId").value.trim()
		this.auth.passwordInput = document.getElementById("password").value.trim()
	}

	loginListiner() {

		document.getElementById("loginBtn").addEventListener("click", (submited) => {
			submited.preventDefault
			// get values for the login input
			this.getLoginInputs()
			this.loader.showLoader()
			// Validate username and password
			if (!this.userAuth.isValidUsername()) {
				alert("Invalid username format. Username should not contain escape keys.");
				this.loader.hideLoader()
				showform()
				return;
			}

			if (!this.userAuth.isValidPassword()) {
				alert("Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
				this.loader.hideLoader()
				showform()
				return;
			}
			this.userAuth.loginAPI();
		})

	}
}

