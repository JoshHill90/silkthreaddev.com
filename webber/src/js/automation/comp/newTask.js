export default class NewTaskForm {
	constructor(Manager, API) {

		this.manager = Manager
		this.api = API

		// inital form values
		this.taskName = null
		this.taskType = null
		this.taskInterval = null
		this.addParam = null
		this.paramSelect = null

		// 							//
		// sections					//
		// 							//

		// sections params 
		this.boolParamsCard = null
		this.counterParamsCard = null
		this.timeParamsCard = null
		// section params buttons
		this.addCounterParams = null
		this.addTimerParams = null
		this.addBoolParams = null
		// sections message type
		this.textMessage = null
		this.emailMessage = null
		this.emailTaskParamsRow = null
		this.textTaskParamsRow = null

	}

	init() {

		// inital form values
		this.taskName = document.getElementById("taskName")
		this.taskType = document.getElementById("taskType")
		this.taskInterval = document.getElementById("taskInterval")
		this.paramSelect = document.getElementById("paramSelect")
		// add param button
		this.addParam = document.getElementById("addParam")

		// 							//
		// sections					//
		// 							//

		// sections message type
		this.textMessage = document.getElementById("textMessage")
		this.emailMessage = document.getElementById("emailMessage")
		this.emailTaskParamsRow = document.getElementById("emailTaskParamsRow")
		this.textTaskParamsRow = document.getElementById("textTaskParamsRow")

		// sections params 
		this.boolParamsCard = document.getElementById("boolParamsCard")
		this.counterParamsCard = document.getElementById("counterParamsCard")
		this.timeParamsCard = document.getElementById("timeParamsCard")
		// param buttons
		this.addTimerParams = document.getElementById("addTimerParams")
		this.addCounterParams = document.getElementById("addCounterParams")
		this.addBoolParams = document.getElementById("addBoolParams")
		this.listeners()
	}

	setTaskType() {

	}

	listeners() {
		this.taskType.addEventListener("input", () => {

			this.closeTaskTypes()
			if (this.taskType.value == "email") {
				this.emailMessage.hidden = false
				this.emailTaskParamsRow.hidden = false
				return
			}
			if (this.taskType.value == "text") {
				this.textMessage.hidden = false
				this.textTaskParamsRow.hidden = false
				return
			}
		})

		this.addParam.addEventListener("click", () => {

			this.closeParamsCards()
			if (this.paramSelect.vlaue == "count") {
				this.counterParamsCard.hidden = false
				return
			}
			if (this.paramSelect.vlaue == "timed") {
				this.timeParamsCard.hidden = false
				return
			}
			if (this.paramSelect.vlaue == "bool") {
				this.boolParamsCard.hidden = false
				return
			}
		})

		this.addTimerParams.addEventListener('click', () => {

		})
		this.addCounterParams.addEventListener('click', () => {

		})
		this.addBoolParams.addEventListener('click', () => {

		})
	}

	closeTaskTypes() {
		this.emailMessage.hidden = true
		this.textMessage.hidden = true

		this.emailTaskParamsRow.hidden = true
		this.textTaskParamsRow.hidden = true
	}

	closeParamsCards() {
		this.boolParamsCard.hidden = true
		this.counterParamsCard.hidden = true
		this.timeParamsCard.hidden = true
	}


}