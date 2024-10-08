export default class TaskMessage {
	constructor(Manager) {
		this.manager = Manager
		this.sendPhonesTo = null
		this.sendEmailsTo = null

		this.recipientEmail = null
		this.emailClientSelect = null
		this.userEmail = null
		this.userPhone = null
		this.recipientPhone = null
		this.phoneClientList = null
		this.emailTemplate = null
		this.sendFromListEmail = null
		this.sendFromListPhone = null
	}

	async init() {
		this.sendPhonesTo = document.getElementById("sendPhonesTo")
		this.sendEmailsTo = document.getElementById("sendEmailsTo")
		this.userPhone = document.getElementById("userPhone")
		this.userEmail = document.getElementById("userEmail")
		this.recipientEmail = document.getElementById("recipientEmail")
		this.emailClientSelect = document.getElementById("emailClientSelect")
		this.recipientPhone = document.getElementById("recipientPhone")
		this.phoneClientList = document.getElementById("phoneClientList")
		this.emailTemplate = document.getElementById("emailTemplate")
		this.sendFromListEmail = document.getElementById("sendFromListEmail")
		this.sendFromListPhone = document.getElementById("sendFromListPhone")
		this.listeners()
		this.hideAll()
		this.setEmailList()
	}
	setEmailList() {
		this.manager.internalUserList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `inue${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = `${listSet.first_name} ${listSet.last_name}`
			this.userPhone.appendChild(listOp)
		})

		this.manager.internalUserList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `inup${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = `${listSet.first_name} ${listSet.last_name}`
			this.userEmail.appendChild(listOp)
		})

		this.manager.emailClientList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `emcl${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = listSet.name
			this.emailClientSelect.appendChild(listOp)
		})

		this.manager.emailClientList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `pmcl${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = listSet.name

			this.phoneClientList.appendChild(listOp)
		})

		this.manager.emailTemplateList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `emt${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = listSet.name
			this.emailTemplate.appendChild(listOp)
		})

		this.manager.emailsenderList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `seme${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = listSet.name

			this.sendFromListPhone.appendChild(listOp)
		})

		this.manager.emailsenderList.forEach((listSet) => {
			var listOp = document.createElement("option")
			listOp.id = `semp${listSet.id}`
			listOp.value = listSet.id
			listOp.innerHTML = listSet.name
			this.sendFromListEmail.appendChild(listOp)

		})

	}

	listeners() {
		this.sendPhonesTo.addEventListener("input", () => {
			this.hideAll()
			if (this.sendPhonesTo.value == "internal") {
				this.userPhone.hidden = false
			}
			if (this.sendPhonesTo.value == "list") {
				this.phoneClientList.hidden = false
			}
			if (this.sendPhonesTo.value == "single") {
				this.recipientPhone.hidden = false
			}
		})
		this.sendEmailsTo.addEventListener("input", () => {
			this.hideAll()
			if (this.sendEmailsTo.value == "internal") {
				this.userEmail.hidden = false
			}
			if (this.sendEmailsTo.value == "list") {
				this.emailClientSelect.hidden = false
			}
			if (this.sendEmailsTo.value == "single") {
				this.recipientEmail.hidden = false
			}
		})
	}

	hideAll() {
		this.userPhone.hidden = true
		this.userEmail.hidden = true
		this.recipientEmail.hidden = true
		this.emailClientSelect.hidden = true
		this.recipientPhone.hidden = true
		this.phoneClientList.hidden = true
	}
}