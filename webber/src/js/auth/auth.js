import { coockieCheck } from './cookies';
import { AuthForms } from './authInputs';
import { UserAuth } from '../api/auth/userAuth';
import { ClientsBtn, SubscriptionsBtn, ProductsBtn, SettingsBtn, ApplicationsBtn, AutomationBtn } from '../sideNavComp/navButtons/groupbuttons';
import { BillingBtn } from '../sideNavComp/navButtons/subscriptionBtn';
import { pageLoader } from '../loader/loader';
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
		this.pageLoader = new pageLoader()
		this.auth = new Auth()
		this.nav = Nav
		this.userAuth = new UserAuth(this.manager, this.auth)
		this.authForms = new AuthForms(this.auth, this.userAuth)
	}

	async init() {
		this.pageLoader.init()
		//console.log("Login Button")
		const cookie = await coockieCheck()
		//console.log("cookie", cookie)
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

		if (currentUrl == this.manager.SiteURL) {
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
		//console.log(this.manager.authorizedUser)
		if (currentUrl.split("/")[4] == "auth.html") {
			document.location.href = "/site/index.html"
		}


	}

	async authGroupCheck() {
		//console.log(this.manager.userGroup)
		this.manager.userGroup.forEach((group) => {
			if (group.name == "admin") {
				const clientbtn = ClientsBtn()
				this.nav.btnList.push(clientbtn)
				const billingBtn = BillingBtn()
				this.nav.btnList.push(billingBtn)
				const automationBtn = AutomationBtn()
				this.nav.btnList.push(automationBtn)
				const productBtn = ProductsBtn()
				this.nav.btnList.push(productBtn)

			}
			if (group.name == "client") {
				const applicationsBtn = ApplicationsBtn()
				this.nav.btnList.push(applicationsBtn)
			}
			if (group.name == "user") {

			}

		})
		const settingBtn = SettingsBtn()
		this.nav.btnList.push(settingBtn)
	}
}


