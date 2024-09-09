export default class CurrentParams {
	constructor(Manager) {
		this.manager = Manager
		this.currentParamsRow = null


	}

	init() {
		this.currentParamsRow = document.getElementById("currentParamsRow")

	}

	show() {
		this.currentParamsRow.hidden = false

	}

	hide() {
		this.currentParamsRow.hidden = true
	}

	add(taskObject) {
		if (taskObject.type = "count") {
			
		}
		if (taskObject.type = "timed") {

		}
		if (taskObject.type = "bool") {

		}
	}

}