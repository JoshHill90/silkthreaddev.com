
import "/node_modules/bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "/src/css/loading.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Security } from "/src/js/auth/auth";
import { Nav } from '/src/js/sideNavComp/sideNav';
import defaultGetCookie from "./auth/siteCookie";
export const thisSiteURL = "http://localhost:5173/"
export const apiURL = "http://127.0.0.1:8000/"
import { SubNav } from "./sideNavComp/subNav";
import { pageLoader } from "./loader/loader";
export class Manager {
	constructor() {
		// the user infomration
		this.authorizedUser = null
		this.userGroup = null
		// base information for the client side
		this.tokenName = null
		this.BaseUrl = null
		this.backEndToken = null
		this.SiteURL = null

		// general page content conetrols
		this.loader = document.getElementById("semicircle");
		this.loginForm = document.getElementById("loginForm")

	}

}

class Application {
	constructor() {
		this.manager = new Manager()
		this.pageLoader = new pageLoader()
		this.nav = new Nav(this.manager)
		this.security = new Security(this.manager, this.nav)
		this.subNav = new SubNav(this.nav)
	}

	async init() {
		this.pageLoader.init()
		this.pageLoader.showLoader()
		this.manager.backEndToken = defaultGetCookie()
		//console.log(this.manager.backEndToken)
		this.manager.SiteURL = thisSiteURL
		this.manager.BaseUrl = apiURL
		await this.security.init()

		// build the nave
		this.nav.init()
		this.subNav.init()

	}
}

document.addEventListener("DOMContentLoaded", () => {
	const ApplicationManager = new Application();
	ApplicationManager.init();
});

