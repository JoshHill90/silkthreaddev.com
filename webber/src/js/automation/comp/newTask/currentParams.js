export default class CurrentParams {
	constructor(Manager) {
		this.manager = Manager
		this.currentParamsRow = null
		this.currentParamsCard = null

	}

	async init() {
		this.currentParamsRow = document.getElementById("currentParamsRow")
		this.currentParamsCard = document.getElementById("currentParamsCard")
	}

	show() {
		this.currentParamsCard.hidden = false

	}

	hide() {
		this.currentParamsCard.hidden = true
	}

	add(taskObject) {
		this.show()
		console.log(taskObject)

		let jsonParamString = ""

		const col = document.createElement("div")
		// count param block
		if (taskObject.type == "count") {
			col.classList.add("col", "task", "task-count")
			col.innerHTML = `
				<button type="button" class="btn-task" id="btn${taskObject.id}${taskObject.type}"> 
					<i class="fa-solid fa-xmark"></i>
				</button>
				<p class="p-task">
					The task will <b>${taskObject.param}</b> <b>${taskObject.count}</b> times
				</p>
				<div class="form-group">
					<input class="addParamInput" 
						id="input${taskObject.type}${taskObject.id}" 
						value="{param1: ${taskObject.param}, trigger: ${taskObject.count}}" 
						hidden>
				</div>
			`
			jsonParamString = `{"type": "count", "param1": "${taskObject.param}", "trigger": "${taskObject.count}"}`;
		}
		// timed param block
		if (taskObject.type == "timed") {
			col.classList.add("col", "task", "task-timed")
			col.innerHTML = `
				<button type="button" class="btn-task" id="btn${taskObject.id}${taskObject.type}"> 
					<i class="fa-solid fa-xmark"></i>
				</button>
				<p class="p-task">
					The task will <b>${taskObject.param}</b> once <b>${taskObject.time} ${taskObject.value}</b> have passed
				</p>
				<div class="form-group">
					<input class="addParamInput" 
						id="input${taskObject.type}${taskObject.id}" 
						value="{param1: ${taskObject.param}, trigger: ${taskObject.time}}" 
						hidden>
				</div>
			`
			jsonParamString = `{"type": "timed", "param1": "${taskObject.param}", "trigger": "${taskObject.time}", "value": "${taskObject.value}"}`;

		}
		// bool param block
		if (taskObject.type == "bool") {
			col.classList.add("col", "task", "task-bool")
			col.innerHTML = `
				<button type="button" class="btn-task" id="btn${taskObject.id}${taskObject.type}"> 
					<i class="fa-solid fa-xmark"></i>
				</button>
				<p class="p-task">
					The task will <b>${taskObject.param1}</b> when <b>${taskObject.param2}</b> is <b>${taskObject.bool}</b>
				</p>
				<div class="form-group">
					<input class="addParamInput" 
						id="input${taskObject.type}${taskObject.id}" 
						hidden>
				</div>
			`
			jsonParamString = `{"type": "bool", "param1": "${taskObject.param1}", "param2":"${taskObject.param2}", "trigger": "${taskObject.bool}"}`;
		}

		this.currentParamsRow.appendChild(col)

		const paramDictInput = document.getElementById(`input${taskObject.type}${taskObject.id}`)
		console.log(paramDictInput)
		paramDictInput.value = jsonParamString
		this.removeTaskBtn(taskObject.id, taskObject.type)
	}

	removeTaskBtn(id, type) {
		const button = document.getElementById(`btn${id}${type}`);
		button.addEventListener("click", () => {
			button.closest(".col").remove();
		})
		return
	}
}