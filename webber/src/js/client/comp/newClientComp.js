export default class NewClientForm {
	constructor(Manager, API) {
		this.manager = Manager
		this.api = API
		this.firstName = null
		this.lastName = null
		this.clientEmail = null
		this.clientPhone = null

		this.newClientBtn = null
	}

	init() {
		this.newClientBtn = document.getElementById("newClientBtn")

		this.firstName = document.getElementById("firstName")
		this.lastName = document.getElementById("lastName")
		this.clientEmail = document.getElementById("clientEmail")
		this.clientPhone = document.getElementById("clientPhone")
	}

	clear() {
		this.firstName.value = ""
		this.lastName.value = ""
		this.clientEmail.value = ""
		this.clientPhone.value = ""
	}

	async post() {
		const newClientformData = {
			"first_name": this.firstName.value,
			"last_name": this.lastName.value,
			"email": this.clientEmail.value,
			"phone": this.clientPhone.value
		}

		const newClientData = await this.api.postNewClient(newClientformData)

		this.manager.clientList.push(newClientData)
		this.clear()
		return
	}

}