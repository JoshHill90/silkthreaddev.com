import { apiURL } from "../main";
import { coockieCheck } from "../auth/cookies";
import SettingsAPI from "./api/settingsAPI";
import settingsForm from "./subcomp/settingsForm";
class SettingsManager {
	constructor() {
		this.apiURL = null
		this.cookie = null
		this.userData = null

		this.settingsforms = null

		this.firstname = null
		this.lastname = null
		this.street = null
		this.unit = null
		this.city = null
		this.state = null
		this.zip = null
		this.phone = null
		this.username = null
		this.UserInfo = null
	}
}

class SettingsPage {
	constructor() {
		this.manager = new SettingsManager()
		this.settingsForm = new settingsForm(this.manager)
		this.api = new SettingsAPI(this.manager)
	}

	async init() {
		try {
			this.manager.apiURL = apiURL
			this.manager.cookie = await coockieCheck()
			// gets users data from db
			this.manager.userData = await this.api.userDataAPI()
			console.log(this.manager.userData)
			this.settingsForm.init()
			this.setUserData()
			// set listiners 
			this.setListiners()
			// set form validation

		}
		// Handle the error
		catch (error) {
			console.error("An error occurred during initialization:", error);

		}
	}

	setListiners() {
		this.manager.firstname = document.getElementById("firstname")
		this.manager.lastname = document.getElementById("lastname")
		this.manager.street = document.getElementById("street")
		this.manager.unit = document.getElementById("unit")
		this.manager.city = document.getElementById("city")
		this.manager.state = document.getElementById("state")
		this.manager.zip = document.getElementById("zip")
		this.manager.phone = document.getElementById("phone")
		this.manager.username = document.getElementById("username")
		console.log("build")
		this.settingsForm.fillForm()

		this.manager.UserInfo = document.getElementById("UserInfo")
		this.manager.UserInfo.addEventListener("click", () => {
			this.settingsForm.update()
		})
		return
	}

	setUserData() {

	}


}

document.addEventListener("DOMContentLoaded", () => {
	const appPage = new SettingsPage()
	appPage.init()
})