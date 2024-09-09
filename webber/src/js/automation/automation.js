
import { apiURL } from "../main";
import defaultGetCookie from "../auth/siteCookie";
import AutomationAPI from "./api/automationAPI";
import NewTaskForm from "./comp/newTask";
// client objects manager 
class AutomationManager {
	constructor() {
		this.apiURL = null
		this.cookie = null
	}
}

class Automation {
	constructor() {
		this.manager = new AutomationManager()
		this.api = new AutomationAPI(this.manager)

		this.newTaskForm = new NewTaskForm(this.manager, this.api)
	}

	// initiate the client page
	async init() {
		//set up api site and cookie
		this.manager.apiURL = apiURL
		this.manager.cookie = defaultGetCookie()
		// set up key componets 

		// initiate componets and build

		this.build()

		this.listeners()
	}

	listeners() {

	}

	reloadData() {
		// this.manager.clientSection.innerHTML = ""
		this.build()
	}

	build() {

	}

}

document.addEventListener("DOMContentLoaded", () => {
	const automation = new Automation();
	automation.init();
});