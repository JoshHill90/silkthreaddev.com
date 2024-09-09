
export class UserAuth {
	constructor(Manager, Auth) {
		this.manager = Manager
		this.auth = Auth
	}

	loginAPI() {
		const jsonData = JSON.stringify({
			"Username": this.auth.userInput,
			"Password": this.auth.passwordInput
		})

		fetch(this.manager.BaseUrl + "user/api/v1/login/", {
			method: 'POST',
			body: jsonData,
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (!res.ok) {
					alert("Invalid Login, please check your input or register for access");
					document.cookie = "${this.manager.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

					return;
				}

				return res.json()
			})
			.then((data) => {
				const backEndToken = data.token
				console.log(this.auth.returnToPage)
				document.cookie = `${this.manager.cookieName}=${backEndToken}`
				if (this.auth.returnToPage && this.auth.returnToPage != "auth") {

					document.location.href = `${this.auth.returnToPage}.html`
				} else if (this.auth.returnToPage && this.auth.returnToPage == "auth") {
					document.location.href = `/index.html`
				} else {
					document.location.href = `/index.html`
				}
			})
			.catch((error) => {
				console.error('Error fetching gallery data:', error)
			});

	}

	isValidUsername() {
		// Check if username contains escape keys
		// You can modify this regex pattern as needed
		let pattern = /[\\`'"$]/;
		return !pattern.test(this.auth.userInput);
	}

	isValidPassword() {
		// Password must be at least 8 characters long
		// Must include at least one uppercase letter, one lowercase letter,
		// one digit, and one special character
		let uppercaseRegex = /[A-Z]/;
		let lowercaseRegex = /[a-z]/;
		let digitRegex = /[0-9]/;
		let specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-]/;

		if (this.auth.passwordInput.length < 8) {
			return false;
		}

		if (!uppercaseRegex.test(this.auth.passwordInput)) {
			return false;
		}

		if (!lowercaseRegex.test(this.auth.passwordInput)) {
			return false;
		}

		if (!digitRegex.test(this.auth.passwordInput)) {
			return false;
		}

		if (!specialCharRegex.test(this.auth.passwordInput)) {
			return false;
		}

		return true;
	}

	async userCheckAPI() {
		try {
			const response = await fetch(this.manager.BaseUrl + "user/api/v1/validate/", {
				method: 'GET',
				headers: {
					'Authorization': 'Token ' + this.manager.backEndToken,
					'X-CSRFToken': this.manager.backEndToken,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				alert("Invalid Token, please refresh and login");
				document.cookie = `${this.manager.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=;`;
				document.location.reload
				return;
			}

			const data = await response.json();
			return data
		} catch (error) {
			console.error('Error fetching gallery data:', error);
		}

	}

}

