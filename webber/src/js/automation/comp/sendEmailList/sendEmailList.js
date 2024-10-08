
export default class SendEmailList {
	constructor(Manager, API, Alerts) {
		this.manager = Manager
		this.api = API
		this.alerts = Alerts
		this.emailSenderRow = null
	}

	async init() {
		this.emailSenderRow = document.getElementById("emailSenderRow")
		const sendersList = await this.api.getSendEmailList()
		sendersList.forEach((senderData) => {
			this.manager.emailsenderList.push(senderData)
		})


	}
	clear() {
		this.emailSenderRow.innerHTML = ""
	}
	componet() {
		this.manager.emailsenderList.forEach((senderList, tempIndex) => {


			const col = document.createElement("div")
			col.classList.add("col-12", "section-item")

			col.innerHTML = `
			<div class="row">
				<div class="col-4">
					<p class="p-n">
						${senderList.name}
					</p>
				</div>
				<div class="col-3 text-center">
					<p class="p-n">
					${senderList.email_list.length}
					</p>
				</div>
				<div class="col-3">
					<p class="p-n">
					${senderList.last_modified}
					</p>
				</div>
				
				<div class="col-2">
					<button id="deleteET${senderList.id}" class="btn-cust-icon-2">
						<i class="fa-solid fa-trash-can"></i>
					</button>
				</div>
			</div>
			`

			this.emailSenderRow.appendChild(col)

			document.getElementById(`deleteET${senderList.id}`).addEventListener("click", async () => {
				await this.api.deleteSendEmailList(senderList.id)
				this.manager.emailsenderList.splice(senderList, 1)
				col.remove()
				this.alerts.notice(`Email template [${senderList.name}] has been deleted.`)
			})
		})
	}

}