
import { pageLoader } from "../loader/loader"
class AuthPage {
	constructor() {
		this.pageLoader = new pageLoader()
	}
	async init() {
		this.pageLoader.init()
		await new Promise(r => setTimeout(r, 2000));
		this.pageLoader.hideLoader()
	}
}

addEventListener("DOMContentLoaded", () => {
	const authPAge = new AuthPage()
	authPAge.init()
})