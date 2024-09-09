import { coockieCheck } from './cookies';
import { AuthForms } from './authInputs';
import { UserAuth } from '../api/auth/userAuth';
import { TaskBtn } from '../sideNavComp/navButtons/baseBtn';


class Auth {
	constructor() {
		this.userInput = null
		this.passwordInput = null
		this.returnToPage = null

	}
}

export class Security {

	constructor(Manager, Nav) {
		this.manager = Manager
		this.auth = new Auth()
		this.nav = Nav
		this.userAuth = new UserAuth(this.manager, this.auth)
		this.authForms = new AuthForms(this.auth, this.userAuth)
	}

	async init() {

		const cookie = await coockieCheck(this.manager.cookieName)

		if (!cookie) {
			this.authStop()
			this.authForms.init()

		} else {
			await this.authValidation()
			await this.authGroupCheck()
		}
		return

	}
	authStop() {
		//console.log("checked")
		const currentUrl = window.location.href;
		const targetUrl = "/site/auth.html";

		if (!currentUrl.split("/")[3]) {
			document.location.href = `/site/auth.html`
		}
		const currentPageHTML = currentUrl.split("site/")[1]
		if (currentUrl.split("/")[3] == "index.html") {
			document.location.href = `/site/auth.html`
		}

		// Check if the current URL does not end with the target URL
		if (!currentUrl.includes(targetUrl)) {
			const currentPage = currentPageHTML.split(".html")[0]
			//console.log(currentPage)
			document.location.href = `/site/auth.html?lookingFor=${currentPage}`;
		}
		return
	}

	// for admin site
	async authValidation() {
		const currentUrl = window.location.href;
		this.manager.authorizedUser = await this.userAuth.userCheckAPI()
		this.manager.userGroup = this.manager.authorizedUser.groups

		// if user is still on the login page and there was no site preselected
		console.log(this.manager.authorizedUser)
		if (currentUrl.split("/")[4] == "auth.html") {
			document.location.href = "/site/index.html"
		}
	}

	async authGroupCheck() {
		console.log(this.manager.userGroup)
		this.manager.userGroup.forEach((group) => {
			if (group.name == "admin") {


			}
			if (group.name == "client") {

			}
			if (group.name == "user") {

			}

		})
		const taskBtn = TaskBtn()
		this.nav.btnList.push(taskBtn)
	}
}


