
import "/node_modules/bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import defaultGetCookie from "./auth/siteCookie";
import { pageLoader } from "./loader/loader";
import { Security } from "/src/js/auth/auth";
import { Nav } from '/src/js/sideNavComp/sideNav';
import { FlipAPI } from "./api/flipcalcAPI";
import Animation from "./animation";
export class Manager {
	constructor() {
		// the user infomration
		this.authorizedUser = null
		this.userGroup = null
		// base information for the client side
		this.tokenName = null
		this.apiURL = null
		this.cookie = null
		this.SiteURL = null

		// general page content conetrols
		this.loader = null
		this.loginForm = null

		this.projectBreakDown = []
	}
}

class Application {
	constructor() {
		this.loader = document.getElementById("semicircle");
		this.loginForm = document.getElementById("loginForm");
		this.manager = new Manager();
		this.loader = new pageLoader();
		this.animation = new Animation();
		this.nav = new Nav(this.manager);
		this.security = new Security(this.manager, this.nav, this.loader);
		this.api = new FlipAPI(this.manager, this.loader);
	}

	async init() {
		this.loader.init()
		this.manager.cookie = defaultGetCookie()
		console.log(this.manager.cookie)
		this.animation.init()
		this.manager.SiteURL = "https://fc.silkthreaddev.com"
		this.manager.apiURL = "https://fc-api.silkthreaddev.com/"
		await this.security.init()
		console.log(this.manager.authorizedUser)
		if (this.manager.authorizedUser) {
			this.api.init()
		}

		// build the nave
		this.nav.init()

	}
}

document.addEventListener("DOMContentLoaded", () => {
	const ApplicationManager = new Application();
	ApplicationManager.init();
});

