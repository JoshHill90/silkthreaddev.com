import { apiURL } from "../main";
import { coockieCheck } from "../auth/cookies";
import SettingsAPI from "../settings/api/settingsAPI";
import AppComp from "./subcomp/appComp";
import { pageLoader } from "../loader/loader";
class AppManager {
	constructor() {
		this.apiURL = null
		this.cookie = null
		this.userData = null

		this.subsciptionList = []

		this.appCard = null
	}
}

class AppPage {
	constructor() {
		this.pageLoader = new pageLoader()
		this.manager = new AppManager()
		this.api = new SettingsAPI(this.manager)
		this.comp = new AppComp(this.manager)
	}

	async init() {
		this.pageLoader.init()
		try {
			this.manager.apiURL = apiURL
			this.manager.cookie = await coockieCheck()
			// gets users data from db
			this.manager.userData = await this.api.userDataAPI()
			this.manager.appCard = document.getElementById("appCard")
			console.log(this.manager.userData)
			this.checksubscriptions()

		}
		// Handle the error
		catch (error) {
			console.error("An error occurred during initialization:", error);

		}
		this.pageLoader.hideLoader()
	}

	checksubscriptions() {
		this.manager.userData.subscriptions.forEach((subscript) => {
			console.log(subscript)
			if (subscript.product === 1) {

				const taskWeber = this.comp.schedular()
				this.manager.subsciptionList.push(taskWeber)

			}
		})

		this.postList()
	}

	postList() {
		this.manager.appCard.innerHTML = ""
		this.manager.subsciptionList.forEach((colHolder) => {
			this.manager.appCard.appendChild(colHolder)
		})
	}

}

document.addEventListener("DOMContentLoaded", () => {
	const appPage = new AppPage()
	appPage.init()
})