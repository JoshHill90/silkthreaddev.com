
export default class NewEmailList {
	constructor(Manager, API, Alerts) {

		this.manager = Manager
		this.api = API
		this.alerts = Alerts
		this.newId = 0
		this.emailListForm = null
		this.addEmailListBtn = null
		this.addEmailToList = null
		this.newlyAddEmailRow = null
		this.newEmailList = []
	}

	async init() {
		this.addEmailToList = document.getElementById("addEmailToList")
		this.emailListForm = document.getElementById("emailListForm")
		this.addEmailListBtn = document.getElementById("addEmailListBtn")
		this.newlyAddEmailRow = document.getElementById("newlyAddEmailRow")
		this.listener()
	}
	listener() {
		this.addEmailListBtn.addEventListener("click", () => {
			this.add()
		})
	}
	clearForm() {
		this.newEmailList.forEach((elm, index) => {
			this.newEmailList.splice(index, 1)
		})
		this.emailListForm.reset()
	}
	clearList() {
		this.newlyAddEmailRow.innerHTML = ""
	}
	add() {
		this.newId += 1
		this.newEmailList.push({ email: this.addEmailToList.value, newId: this.newId })
		this.addEmailToList.value = ""
		this.componet()

	}
	componet() {
		this.clearList()
		this.newEmailList.forEach((newEmail, emailIndex) => {
			const col = document.createElement("div")
			col.classList.add("col-12", "section-item")
			col.id = `newEmail${newEmail.newId}`
			col.innerHTML = `
				<div class="row">
					<div class="col-8">
						<p class="p-n">
							${newEmail.email}
						</p>
					</div>

					<div class="col-4">
						<button type="button" id="deleteET${newEmail.newId}" class="btn-cust-icon-2">
							<i class="fa-solid fa-trash-can"></i>
						</button>
					</div>
				</div>

				<div class="form-group" hidden>
					<input id="newEmail${newEmail.newId}Input" name="newEmail${newEmail.newId}" type="email"
						class="form-control addedEmail" value="${newEmail.email}">
				</div>
			`
			this.newlyAddEmailRow.appendChild(col)
			document.getElementById(`deleteET${newEmail.newId}`).addEventListener("click", () => {
				document.getElementById(`newEmail${newEmail.newId}`).remove()
				this.newEmailList.splice(emailIndex, 1)
				this.componet()
			})
		})
	}
	async post() {
		const addEmailName = document.getElementById("addEmailName").value
		const addEmailKey = document.getElementById("addEmailKey").value
		const newEmailListForm = { "emails": [], email_key: addEmailKey, "name": addEmailName }

		const newEmailInputs = document.querySelectorAll(".addedEmail")
		newEmailInputs.forEach((newEmail) => {
			console.log(newEmail.value)
			newEmailListForm.emails.push(newEmail.value)
		})
		console.log(newEmailListForm)
		const newTemplate = await this.api.postNewSendEmailList(newEmailListForm)
		this.manager.emailsenderList.push(newTemplate)
		//this.alerts.notice(`Email template [${(newTemplate.name.split("/")[2]).split(" -")[0]}] has been created.`)
	}

}
