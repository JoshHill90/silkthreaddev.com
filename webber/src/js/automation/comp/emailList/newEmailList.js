
export default class NewContactList {
	constructor(Manager, API) {

		this.manager = Manager
		this.api = API

		this.contactForm = null
	}

	async init() {
		this.contactForm = document.getElementById("contactForm")
	}

	async post() {
		const formListData = new FormData(this.contactForm);

		const newContactList = await this.api.postContactList(formListData)
		this.manager.emailClientList.push(newContactList)
	}

	clearForm() {
		this.contactForm.reset()
	}
}
