
export default class EmailTemplates {
	constructor(Manager, API, Alerts) {

		this.manager = Manager
		this.api = API
		this.alerts = Alerts

		this.templateForm = null
	}

	async init() {

		this.templateForm = document.getElementById("templateForm")

	}
	clearForm() {
		this.templateForm.reset()
	}
	async post() {
		const formTemplateData = new FormData(this.templateForm);

		const newTemplate = await this.api.postEmailTemplate(formTemplateData)
		this.manager.emailTemplateList.push(newTemplate)
		this.alerts.notice(`Email template [${(newTemplate.name.split("/")[2]).split(" -")[0]}] has been created.`)
	}

}
