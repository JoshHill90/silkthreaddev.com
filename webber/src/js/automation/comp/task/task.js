export default class Task {
	constructor(Manager, API, Alerts) {
		this.manager = Manager
		this.api = API
		this.alerts = Alerts
		this.userTaskListRow = null

	}

	async init() {
		this.userTaskListRow = document.getElementById("userTaskListRow")
		await this.getData()
	}

	async getData() {
		const userTask = await this.api.getTaskList();
		userTask.forEach((taskSet) => {
			this.manager.taskList.push(taskSet)
		})
	}
	clear() {
		this.userTaskListRow.innerHTML = ""
	}
	componet() {
		this.manager.taskList.forEach(async (task, taskIndex) => {
			let nextRun = "Not Scheduled"
			let active = ""
			if (task.task.next_run) {
				nextRun = task.task.next_run
			}
			if (task.task.active == true) {
				active = `<div class="active-task"></div>`
			} else {
				active = `<div class="inactive-task"></div>`
			}
			var type_set = this.contentTypeCheck(task.task.content_object)
			console.log(type_set)
			var col = document.createElement("div")
			col.classList.add("col-12")
			col.innerHTML = `
			<div class="task-card">
				<div class="row">
					<div class="col-10 mb-2">
						<p class="p-title">Task: ${task.task.name}</p>
					</div>
					<div class="col-2 mb-2">
						<a class="btn-cust-2 w-100" id="oc${task.task.id}" data-bs-toggle="collapse" href="#collapseTask${task.task.id}"
							role="button" aria-expanded="false" aria-controls="collapseTask${task.task.id}">
							Open
						</a>
					</div>
					<div class="col-12">
						<div class="collapse" id="collapseTask${task.task.id}">
							<div class="row">
								<div class="col-12 col-md-6">
									<p class="p-n"><b>Next Run</b>: ${nextRun}</p>
									<p class="p-n"><b>Active</b>:${active}</p>
									<p class="p-n"><b>Interval</b>: ${task.task.interval}</p>
									<p class="p-n"><b>Type</b>: ${type_set.type}</p>
								</div>
							
							<div class="col-12 col-md-6">
								
								<div id="contentCol${task.task.id}" class="row">
								</div>
								
							</div>
							<div class="col-6 col-md-4 text-center">
							
								<button class="btn-cust-1 w-100" data-bs-toggle="collapse" href="#collapseTaskParam${task.task.id}"
									role="button" aria-expanded="false" aria-controls="collapseTaskParam${task.task.id}">
									Parameters
								</button>
								
							</div>
							<div class="col-6 col-md-4 text-center">
							</div>
							<div class="col-6 col-md-4 text-center">
								
								<button class="btn-cust-3 w-100" id="delete${task.task.id}">
									Delete
								</button>
								
							</div>
						</div>
					
						<div class="collapse" id="collapseTaskParam${task.task.id}">
							<div class="section-details-card">
								<div id="taskParam${task.task.id}" class="row">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			 `
			this.userTaskListRow.appendChild(col)
			document.getElementById(`contentCol${task.task.id}`).appendChild(type_set.div)
			const taskParams = document.getElementById(`taskParam${task.task.id}`)
			task.params.forEach((parameter, indexParam) => {
				const paramBlock = this.paramTypeCheck(parameter, indexParam)

				taskParams.appendChild(paramBlock)
			})

			document.getElementById(`delete${task.task.id}`).addEventListener("click", async () => {

				await this.api.deleteTask(task.task.id)
				col.remove()
				this.alerts.notice(`Task [${task.task.name}] Deleted`)
				this.manager.taskList.splice(taskIndex, 1)
			})

		})
	}

	contentTypeCheck(content_object) {
		console.log(content_object)
		const contentObject = document.createElement("div")
		contentObject.classList.add("col-12")
		let receipient = null
		if (content_object.body) {
			if (content_object.recipient.type == "single") {
				receipient = content_object.recipient.phone
			}
			if (content_object.recipient.type == "list") {
				receipient = content_object.recipient.list_name
			}
			if (content_object.recipient.type == "internal") {
				receipient = content_object.recipient.user
			}
			contentObject.innerHTML = `
				<p class="p-b">Text Content</p>
				<p class="p-n"><b>Subject</b>: ${content_object.subject}</p>
				<p class="p-n"><b>Body</b>: ${content_object.body.substring(0, 25)}...</p>
				<p class="p-n"><b>Recipient Type</b>: ${content_object.recipient.type}</p>
				<p class="p-n"><b>Recipient/List</b>: ${receipient}</p>
			`

			return { type: "Text", div: contentObject }
		}
		if (content_object.email_template) {

			if (content_object.recipient.type == "single") {
				receipient = content_object.recipient.email
			}
			if (content_object.recipient.type == "list") {
				receipient = content_object.recipient.list_name
			}
			if (content_object.recipient.type == "internal") {
				receipient = content_object.recipient.user
			}

			contentObject.innerHTML = `
				<p class="p-b">Email Content</p>
				<p class="p-n"><b>Subject</b>: ${content_object.subject}</p>
				<p class="p-n"><b>Template</b>: ${content_object.email_template.name}</p>
				<p class="p-n"><b>Recipient Type</b>: ${content_object.recipient.type}</p>
				<p class="p-n"><b>Recipient/List</b>: ${receipient}</p>
			`

			return { type: "Email", div: contentObject }
		}
	}

	paramTypeCheck(parameter, indexP) {
		const col = document.createElement("div")
		col.classList.add("col")
		if (parameter.value_type == "count") {
			col.innerHTML = `
				<div class="row">
					<div class="col-12 col-md-6">
						<p class="p-l">Parameter ${indexP + 1}: Count</p>
						<p class="p-nl"><b>Count Type</b>: ${parameter.value.count_type}</p>
						<p class="p-nl"><b>Trigger</b>: ${parameter.trigger}</p>
					</div>
				
					<div class="col-12 col-md-6">
						<p class="p-l">Parameter Description</p>
						<p class="p-task">
							The task will <b>${parameter.value.count_type}</b> <b>${parameter.trigger}</b> times
						</p>
					</div>
				</div>
			`
			col.classList.add("task", "task-count")

			return col
		}
		if (parameter.value_type == "time") {
			col.innerHTML = `
				<div class="row">
					<div class="col-12 col-md-6">
						<p class="p-l">Parameter ${indexP + 1}: Timed</p>
						<p class="p-nl"><b>start-End</b>: ${parameter.value.start_end}</p>
						<p class="p-nl"><b>Time Value</b>: ${parameter.value.time_value}</p>
						<p class="p-nl"><b>Trigger</b>: ${parameter.trigger}</p>
					</div>
					<div class="col-12 col-md-6">
						<p class="p-l">Parameter Description</p>
						<p class="p-task">
							The task will <b>${parameter.value.start_end}</b> once <b>${parameter.trigger} ${parameter.value.time_value}</b> have passed
						</p>
					</div>
				</div>
			`
			col.classList.add("task", "task-timed")
			return col
		}
		if (parameter.value_type == "bool") {
			col.innerHTML = `
				<div class="row">
					<div class="col-12 col-md-6">
						<p class="p-l">Parameter ${indexP + 1}: Bool</p>
						<p class="p-nl"><b>Start-End</b>: ${parameter.value.start_end}</p>
						<p class="p-nl"><b>Model</b>: ${parameter.value.model}</p>
						<p class="p-nl"><b>Field</b>: ${parameter.value.field}</p>
						<p class="p-nl"><b>Trigger</b>: ${parameter.trigger}</p>
					</div>
					<div class="col-12 col-md-6">
						<p class="p-l">Parameter Description</p>
						<p class="p-task">
							The task will <b>${parameter.value.start_end}</b> when <b>${parameter.value.model} ${parameter.value.field}</b> is <b>${parameter.trigger}</b>
						</p>
					</div>
				</div>
			`
			col.classList.add("task", "task-bool")
			return col
		}

	}
}