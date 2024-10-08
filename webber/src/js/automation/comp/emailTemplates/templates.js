
export default class Templates {
	constructor(Manager, API, Alerts) {
		this.manager = Manager
		this.api = API
		this.alerts = Alerts
		this.emaitemplateRow = null
	}

	async init() {
		this.emaitemplateRow = document.getElementById("emaitemplateRow")
		const userTemplates = await this.api.getEmailTemplate()
		userTemplates.forEach((template) => {
			this.manager.emailTemplateList.push(template)
		})

	}
	clear() {
		this.emaitemplateRow.innerHTML = ""
	}
	componet() {
		this.manager.emailTemplateList.forEach((temaplte, tempIndex) => {

			var update_date = temaplte.last_updated.split("T")[0]
			var date_day = new Date(update_date).getDate()
			var date_month = new Date(update_date).getMonth()
			var date_year = new Date(update_date).getFullYear()
			const col = document.createElement("div")
			col.classList.add("col-12", "section-item")

			col.innerHTML = `
			<div class="row">
				<div class="col-6">
					<p class="p-n">
						${(temaplte.name.split("/")[2]).split(" -")[0]}
					</p>
				</div>

				<div class="col-4">
					<p class="p-n">
						${date_month}-${date_day}-${date_year}
					</p>
				</div>
				
				<div class="col-2">
					<button id="deleteET${temaplte.id}" class="btn-cust-icon-2">
						<i class="fa-solid fa-trash-can"></i>
					</button>
				</div>
			</div>
			`

			this.emaitemplateRow.appendChild(col)

			document.getElementById(`deleteET${temaplte.id}`).addEventListener("click", async () => {
				await this.api.deleteEmailtemplate(temaplte.id)
				this.manager.emailTemplateList.splice(temaplte, 1)
				col.remove()
				this.alerts.notice(`Email template [${(temaplte.name.split("/")[2]).split(" -")[0]}] has been deleted.`)
			})
		})
	}

}