
export default class EmailList {
	constructor(Manager, API, Alerts) {
		this.manager = Manager
		this.api = API
		this.alerts = Alerts
		this.emailListRow = null
	}

	async init() {
		this.emailListRow = document.getElementById("emailListRow")
		const userContactList = await this.api.getContactList()
		userContactList.forEach((list_set) => {
			this.manager.emailClientList.push(list_set)
		})

	}

	clear() {
		this.emailListRow.innerHTML = ""
	}

	componet() {
		this.manager.emailClientList.forEach((listSet, listSetIndex) => {
			const col = document.createElement("div")
			col.classList.add("col-12", "section-item")

			col.innerHTML = `
			<div class="row">
				<div class="col-3">
					<p class="p-n">
						${listSet.name}
					</p>
				</div>

				<div class="col-3">
					<p class="p-n">
						${listSet.email_count}
					</p>
				</div>
					<div class="col-3">
					<p class="p-n">
						${listSet.phone_count}
					</p>
				</div>
				<div class="col-3">
					<button id="deleteCL${listSet.id}" class="btn-cust-icon-2">
						<i class="fa-solid fa-trash-can"></i>
					</button>
				</div>
			</div>
			`

			this.emailListRow.appendChild(col)

			document.getElementById(`deleteCL${listSet.id}`).addEventListener("click", async () => {
				await this.api.deleteContactList(listSet.id)

				this.manager.emailClientList.splice(listSetIndex, 1)
				col.remove()
				this.alerts.notice(`Contact List [${listSet.name}] has been deleted.`)
			})
		})
	}

}