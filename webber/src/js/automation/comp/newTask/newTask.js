import CurrentParams from "./currentParams"
import TaskMessage from "./taskMessage"
import AddVariable from "./addVariable"
export default class NewTaskForm {
	constructor(Manager, API, Alerts) {

		this.manager = Manager
		this.api = API
		this.alerts = Alerts
		this.CurrentParams = new CurrentParams(this.manager)
		this.taskMessages = new TaskMessage(this.manager)
		this.AddVariable = new AddVariable()

		this.newTaskForm = null
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
		this.closeTimerParams = null
		this.closeCounterParams = null
		this.closeBoolParams = null
		// sections message type
		this.textMessage = null
		this.emailMessage = null
		this.emailTaskParamsRow = null
		this.textTaskParamsRow = null
		// email templatre key values 
		this.addVariableBtn = null
		this.emailTemplate = null

		// 		 	//
		// state 	//
		// 		 	//
		this.ParamCounter = 0
		this.keyvalueCounter = 0
	}

	async init() {
		this.newTaskForm = document.getElementById("taskForm")
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

		this.closeTimerParams = document.getElementById("closeTimerParams")
		this.closeCounterParams = document.getElementById("closeCounterParams")
		this.closeBoolParams = document.getElementById("closeBoolParams")
		// email variable button
		this.addVariableBtn = document.getElementById("addVariableBtn")
		this.emailTemplate = document.getElementById("emailTemplate")

		await this.CurrentParams.init()
		await this.taskMessages.init()
		await this.AddVariable.init()
		this.listeners()
	}

	clearForm() {
		this.newTaskForm.reset()

		this.CurrentParams.currentParamsRow.innerHTML = ""
		this.CurrentParams.hide()

		this.AddVariable.addVariableRow.innerHTML = ""
		this.AddVariable.hide()
	}

	listeners() {
		// set up accordion section listiners 
		document.querySelectorAll('.close-accordion-btn').forEach(function (button) {
			button.addEventListener('click', function () {

				var accordionSection = this.closest('.accordion-collapse');

				accordionSection.classList.remove('show');
			});
		});
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
			console.log("click")
			this.closeParamsCards()
			if (this.paramSelect.value == "count") {
				this.counterParamsCard.hidden = false
				return
			}
			if (this.paramSelect.value == "timed") {
				this.timeParamsCard.hidden = false
				return
			}
			if (this.paramSelect.value == "bool") {
				this.boolParamsCard.hidden = false
				return
			}
		})
		// add buttons for add params
		this.addTimerParams.addEventListener('click', () => {
			this.ParamCounter += 1
			const taskObject = {
				id: this.ParamCounter,
				type: "timed",
				param: document.getElementById("timeParam").value,
				time: document.getElementById("timeTrigger").value,
				value: document.getElementById("timeValue").value
			}
			this.CurrentParams.add(taskObject)
		})

		this.addCounterParams.addEventListener('click', () => {
			this.ParamCounter += 1
			const taskObject = {
				id: this.ParamCounter,
				type: "count",
				param: document.getElementById("countParam").value,
				count: document.getElementById("countTrigger").value
			}
			this.CurrentParams.add(taskObject)
		})

		this.addBoolParams.addEventListener('click', () => {
			this.ParamCounter += 1
			const taskObject = {
				id: this.ParamCounter,
				type: "bool",
				param1: document.getElementById("boolStartOrEnd").value,
				param2: document.getElementById("stateofBool").value,
				bool: document.getElementById("boolTrigger").value
			}
			this.CurrentParams.add(taskObject)
		})
		// close buttons for add params
		this.closeTimerParams.addEventListener('click', () => {
			this.closeParamsCards()
		})
		this.closeCounterParams.addEventListener('click', () => {
			this.closeParamsCards()
		})
		this.closeBoolParams.addEventListener('click', () => {
			this.closeParamsCards()
		})

		this.addVariableBtn.addEventListener("click", () => {
			this.keyvalueCounter += 1

			this.AddVariable.add(this.keyvalueCounter)
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


	async post() {

		const formData = new FormData(this.newTaskForm);
		const dataDict = {};
		const emailVariables = []
		const paramSets = []

		// Iterate over all form fields
		formData.forEach((value, key) => {
			if (value.trim() !== "") { // Check if value is not blank
				dataDict[key] = value;
			}
		});

		// Collect task parameters
		document.querySelectorAll(".addParamInput").forEach((param) => {
			if (param.value.trim() !== "") {
				// Check if value is not blank
				// Parse the JSON string into an object if it's valid
				try {
					paramSets.push(JSON.parse(param.value));
				} catch (e) {
					console.error(`Invalid JSON in param input: ${param.value}`, e);
				}
			}
		});

		// Collect email variables
		document.querySelectorAll(".ValueVar").forEach((variableSet) => {
			if (variableSet.value.trim() !== "") {
				// Check if value is not blank
				// Parse the JSON string into an object if it's valid
				try {
					emailVariables.push(JSON.parse(variableSet.value));
				} catch (e) {
					console.error(`Invalid JSON in email variable input: ${variableSet.value}`, e);
				}
			}
		});

		if (this.taskMessages.sendPhonesTo.value != "") {
			if (this.taskMessages.sendPhonesTo.value == "internal") {
				dataDict["user_contact"] = this.taskMessages.userPhone.value
			}
			if (this.taskMessages.sendPhonesTo.value == "list") {
				dataDict["contact_list"] = this.taskMessages.phoneClientList.value
			}
			if (this.taskMessages.sendPhonesTo.value == "single") {
				dataDict["contact_info"] = this.taskMessages.recipientPhone.value
			}
		}

		if (this.taskMessages.sendEmailsTo.value != "") {
			if (this.taskMessages.sendEmailsTo.value == "internal") {
				dataDict["user_contact"] = this.taskMessages.userEmail.value
			}
			if (this.taskMessages.sendEmailsTo.value == "list") {
				dataDict["contact_list"] = this.taskMessages.emailClientSelect.value
			}
			if (this.taskMessages.sendEmailsTo.value == "single") {
				dataDict["contact_info"] = this.taskMessages.recipientEmail.value
			}

			if (this.emailTemplate.value == "") {
				this.alerts.alert("Email Task automation <b>requires</b> an <b>HTML template</b>")
				return "failed"
			}
		}

		if (paramSets.length == 0) {
			this.alerts.alert("Task automation <b>requires</b> specific <b>parameters</b> to execute properly")
			return "failed"
		}



		dataDict["task_params"] = paramSets
		dataDict["email_variables"] = emailVariables
		const newTaskCreated = await this.api.postNewTask(dataDict); // Log the final dictionary
		console.log(newTaskCreated)
		this.manager.taskList.push(newTaskCreated[0])
		return "success"
	}

}
